import { APP_GUARD } from '@nestjs/core/constants';
import { IndexModule } from './index/index.module';
import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { RolesGuard } from 'src/core/common/auth/guards/roles.guard';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        IndexModule,
        RoleModule,
        UserModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ]
})
export class ApiV1Module { }
