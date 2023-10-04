import { AppModule } from 'src/app.module';
import { ConfigService } from '@nestjs/config';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';

export async function CreateFastifyApplication(opts: any = {}): Promise<NestFastifyApplication> {
    const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(opts),
    );

  	return app;
}

export async function configureFastify(
	app: NestFastifyApplication,
	configService?: ConfigService,
) {
	// TODO: Register any plugin here
}
