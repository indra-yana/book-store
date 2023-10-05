import { IndexModule } from './index/index.module';
import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';

@Module({
    imports: [
        IndexModule,
        RoleModule,
        UserModule,
        BookModule,
    ],
    providers: []
})
export class ApiV1Module { }
