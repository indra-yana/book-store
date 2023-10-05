import { Module } from '@nestjs/common';
import { IndexController } from './index.controller';
import { IndexService } from './index.service';
import { ConfigService } from '@nestjs/config';

@Module({
    controllers: [IndexController],
    providers: [IndexService],
    imports: [],
})
export class IndexModule { }
