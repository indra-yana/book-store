import { Book } from 'src/core/common/database/typeorm/entities/book';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([Book]),
    ],
    exports: [BookService],
    providers: [BookService],
    controllers: [BookController],
})
export class BookModule { }
