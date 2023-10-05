import { Book } from 'src/core/common/database/typeorm/entities/book';
import { BookService } from './book.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../user/user.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Book]),
    ],
    exports: [BookService],
    providers: [BookService],
    controllers: [UserController],
})
export class BookModule { }
