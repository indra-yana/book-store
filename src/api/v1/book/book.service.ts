import { Book } from 'src/core/common/database/typeorm/entities/book';
import { CreateBookDto } from './dto/create-book.dto';
import { getSkip, paginate, PagingQuery } from 'src/core/helper/pagination';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocaleService } from 'src/core/common/locale/locale.service';
import { Repository } from 'typeorm';
import { UpdateBookDto } from './dto/update-book.dto';
import InvariantException from 'src/core/exceptions/InvariantException';
import NotFoundException from 'src/core/exceptions/NotFoundException';

@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
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

}
