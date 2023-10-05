import { Book } from 'src/core/common/database/typeorm/entities/book';
import { BOOK_STATUS } from 'src/core/helper/constant';
import { BookBorrower } from 'src/core/common/database/typeorm/entities/book-borrower';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { getSkip, paginate, PagingQuery } from 'src/core/helper/pagination';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dateDiffInDays, joiValidationFormat } from 'src/core/helper/helper';
import { LocaleService } from 'src/core/common/locale/locale.service';
import { Not, Repository } from 'typeorm';
import { UpdateBookDto } from './dto/update-book.dto';
import { User } from 'src/core/common/database/typeorm/entities/user';
import InvariantException from 'src/core/exceptions/InvariantException';
import NotFoundException from 'src/core/exceptions/NotFoundException';
import ValidationException from 'src/core/exceptions/ValidationException';
import { ReturnedBookDto } from './dto/returned-book.dto';

@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(BookBorrower)
        private bookBorrowerRepository: Repository<BookBorrower>,
        private locale: LocaleService,
    ) { }

    async create(payloads: CreateBookDto) {
        const { code, title, author, stock } = payloads;
        const params: Partial<Book> = {
            code,
            title,
            author,
            stock,
        }

        const data = new Book(params);
        const result = await this.bookRepository.save(data);

        return {
            id: result.id
        }
    }

    async update(payloads: UpdateBookDto) {
        const { id, code, title, author, stock } = payloads;
        const params: Partial<Book> = {
            code,
            title,
            author,
            stock,
        }

        const result = await this.bookRepository.update(id, params);
        if (result.affected === 0) {
            throw new InvariantException({
                message: this.locale.t('app.message.updated_fail'),
            });
        }

        return await this.find(id);
    }

    async delete(id: string) {
        const result = await this.bookRepository.delete(id);
        return result.affected !== 0;
    }

    async find(id: string, password: boolean = false) {
        const result = await this.bookRepository.findOne({
            where: {
                id,
            },
        });

        if (!result) {
            throw new NotFoundException({
                message: this.locale.t('app.message.data_notfound'),
            });
        }

        return result;
    }

    async all(query: PagingQuery) {
        const { page, limit } = query;
        const skip = getSkip(page, limit);
        const result = await this.bookRepository.findAndCount({
            take: limit,
            skip
        });

        const [data = null, total = 0] = result;
        return paginate(data, page, limit, total);
    }

    async borrowBook(payloads: BorrowBookDto) {
        const { borrower_id, book_id, returned_at } = payloads;

        await this.checkIfMemberHasBorrowTwoBook(borrower_id, book_id);

        await this.checkIfBookHasBorrowByOther(borrower_id, book_id);

        await this.checkIfMemberHasPinalized(borrower_id);

        const data = new BookBorrower({
            borrower_id,
            book_id,
            returned_at,
            status: BOOK_STATUS.BORROWED,
        });

        const result = await this.bookBorrowerRepository.save(data);
        return result;
    }

    async returnedBook(payloads: ReturnedBookDto) {
        const { borrower_id: borrowerId, book_id: bookId } = payloads;

        // The returned book is a book that the member has borrowed
        const checkHasBorowerBook = await this.bookBorrowerRepository.findOneBy({
            status: BOOK_STATUS.BORROWED,
            borrower: {
                id: borrowerId,
            },
            book: {
                id: bookId,
            }
        })

        if (!checkHasBorowerBook) {
            throw new ValidationException({
                message: this.locale.t('app.message.validation_fail'),
                error: joiValidationFormat([
                    {
                        path: ['book_id'],
                        message: 'The book that you borrow is not correct',
                    }
                ]),
            }); 
        }

        const result = await this.bookBorrowerRepository.update(checkHasBorowerBook.id, {
            ...checkHasBorowerBook,
            status: BOOK_STATUS.RETURNED,
        });

        if (result.affected === 0) {
            throw new InvariantException({
                message: this.locale.t('app.message.updated_fail'),
            });
        }

        // If the book is returned after more than 7 days, the member will be subject to a penalty. 
        // Member with penalty cannot able to borrow the book for 3 days
        if (dateDiffInDays(checkHasBorowerBook.returned_at, new Date()) >= 7) {
            const date = new Date();
            await this.userRepository.update(borrowerId, {
                penalty: true,
                penalty_until: date.setDate(date.getDate() + 7),
            })
        }
        
        return result.affected !== 0;
    }

    async checkIfMemberHasBorrowTwoBook(borrowerId: string, bookId: string) {
        // Members may not borrow more than 2 books
        const checkHasTwoBook = await this.bookBorrowerRepository.countBy({
            status: BOOK_STATUS.BORROWED,
            borrower: {
                id: borrowerId,
            },
            book: {
                id: bookId,
            }
        })

        if (checkHasTwoBook === 2) {
            throw new ValidationException({
                message: this.locale.t('app.message.validation_fail'),
                error: joiValidationFormat([
                    {
                        path: ['borrower_id'],
                        message: 'This member has borrowed two book.',
                    }
                ]),
            });
        }

        return true;
    }

    async checkIfBookHasBorrowByOther(borrowerId: string, bookId: string) {
        // Borrowed books are not borrowed by other members
        const checkBookHasBorrowed = await this.bookBorrowerRepository.countBy({
            status: BOOK_STATUS.BORROWED,
            borrower: {
                id: Not(borrowerId),
            },
            book: {
                id: bookId,
            }
        })

        if (checkBookHasBorrowed) {
            throw new ValidationException({
                message: this.locale.t('app.message.validation_fail'),
                error: joiValidationFormat([
                    {
                        path: ['book_id'],
                        message: 'The book has borrowed by the other',
                    }
                ]),
            }); 
        }
    }

    async checkIfMemberHasPinalized(memberId: string) {
        // Check if member is currently not being penalized
        const member = await this.userRepository.findOneBy({
            id: memberId,
        });

        if (member?.penalty && member?.penalty_until) {
            throw new ValidationException({
                message: this.locale.t('app.message.validation_fail'),
                error: joiValidationFormat([
                    {
                        path: ['borrower_id'],
                        message: `Member is currently in penalized, can't borrow until ${member.penalty_until}`,
                    }
                ]),
            });  
        }

        return true;
    }

}
