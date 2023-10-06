import { addUserRoleSchema, createUserSchema, updateUserSchema, validateIdSchema } from './user.validator.schema';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Body, ClassSerializerInterceptor, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ValidatorService } from 'src/core/common/validator/validator.service';

@ApiTags('Member')
@UseInterceptors(ClassSerializerInterceptor)
@Controller({
    path: 'user',
    version: '1',
})
export class UserController {
    constructor(
        private userService: UserService,
        private validator: ValidatorService,
    ) { }

    @ApiExcludeEndpoint()
    @Post('create')
    async create(@Body() body: CreateUserDto) {
        try {
            this.validator.schema(createUserSchema).validate(body);

            const user = await this.userService.create(body);

            return user;
        } catch (error) {
            throw error;
        }
    }

    @ApiExcludeEndpoint()
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

    @ApiExcludeEndpoint()
    @Put('update')
    async update(@Body() body: UpdateUserDto) {
        try {
            this.validator.schema(updateUserSchema).validate(body);

            const user = await this.userService.update(body);

            return user;
        } catch (error) {
            throw error;
        }
    }

    @ApiExcludeEndpoint()
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

    @ApiExcludeEndpoint()
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

    @ApiExcludeEndpoint()
    @Post('role/add')
    async addRole(@Body() body: object) {
        try {
            this.validator.schema(addUserRoleSchema).validate(body);

            const result = await this.userService.addRole(body);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @ApiExcludeEndpoint()
    @Delete('role/remove')
    async removeRole(@Body() body: object) {
        try {
            this.validator.schema(addUserRoleSchema).validate(body);

            const result = await this.userService.removeRole(body);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Get('members')
    async members(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ) {
        try {
            const result = await this.userService.members({
                page,
                limit,
            });

            return result;
        } catch (error) {
            throw error;
        }
    }
}
