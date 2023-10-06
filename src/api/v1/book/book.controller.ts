import { ApiTags } from '@nestjs/swagger';
import { Body, ClassSerializerInterceptor, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { createBookSchema, updateBookSchema, validateBorrowSchema, validateIdSchema, validateReturnedSchema } from './book.validator.schema';
import { ReturnedBookDto } from './dto/returned-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ValidatorService } from 'src/core/common/validator/validator.service';

@ApiTags('Book')
@UseInterceptors(ClassSerializerInterceptor)
@Controller({
    path: 'book',
    version: '1',
})
export class BookController {
    constructor(
        private userService: BookService,
        private validator: ValidatorService,
    ) { }

    @Post('create')
    async create(@Body() body: CreateBookDto) {
        try {
            this.validator.schema(createBookSchema).validate(body);

            const user = await this.userService.create(body);
            return user;
        } catch (error) {
            throw error;
        }
    }

    @Delete('delete')
    async delete(@Body('id') id: string) {
        try {
            this.validator.schema(validateIdSchema).validate({ id });

            const result = await this.userService.delete(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Put('update')
    async update(@Body() body: UpdateBookDto) {
        try {
            this.validator.schema(updateBookSchema).validate(body);

            const user = await this.userService.update(body);

            return user;
        } catch (error) {
            throw error;
        }
    }

    @Get('list')
    async all(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ) {
        try {
            const result = await this.userService.all({
                page,
                limit,
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Get('show/:id')
    async show(@Param('id') id: string) {
        try {
            this.validator.schema(validateIdSchema).validate({ id });

            const result = await this.userService.find(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Post('borrow')
    async borrowBook(@Body() body: BorrowBookDto) {
        try {
            this.validator.schema(validateBorrowSchema).validate(body);

            const result = await this.userService.borrowBook(body);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Post('returned')
    async returnedBook(@Body() body: ReturnedBookDto) {
        try {
            this.validator.schema(validateReturnedSchema).validate(body);

            const result = await this.userService.returnedBook(body);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
