import 'dotenv/config';
import "reflect-metadata"
import { ApiV1Module } from './api/v1/api.v1.module';
import { ConfigModule } from '@nestjs/config';
import { LocaleModule } from './core/common/locale/locale.module';
import { Module } from '@nestjs/common';
import { TypeOrmDatabaseModule } from './core/common/database/typeorm/typeorm.module';
import { ValidatorModule } from './core/common/validator/validator.module';
import app from './core/config/app';
import database from './core/config/database';

@Module({
	imports: [
		LocaleModule,
		TypeOrmDatabaseModule,
		ValidatorModule,
		ApiV1Module,
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true,
			cache: process.env.NODE_ENV === 'production',
			envFilePath: '.env',
			load: [
				app,
				database,
			],
		}),
	],
})
export class AppModule { }
