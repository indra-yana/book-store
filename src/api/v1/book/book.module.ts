import { Book } from 'src/core/common/database/typeorm/entities/book';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookBorrower } from 'src/core/common/database/typeorm/entities/book-borrower';
import { User } from 'src/core/common/database/typeorm/entities/user';

@Module({
    imports: [
        TypeOrmModule.forFeature([Book, User, BookBorrower]),
    ],
    exports: [BookService],
    providers: [BookService],
    controllers: [BookController],
})
export class BookModule { }
