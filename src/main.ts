import { ConfigService } from '@nestjs/config';
import { configureFastify, CreateFastifyApplication } from './app.context';
import { configureSwagger } from './api/v1/doc.v1.swagger';
import { VersioningType } from '@nestjs/common';
import HttpExceptionFilter from './core/filter/http-exception.filter';
import HttpResponseInterceptor from './core/interceptor/http-response.interceptor';

async function bootstrap() {
  const app = await CreateFastifyApplication();
  const configService = app.get<ConfigService>(ConfigService);  
  
  await configureFastify(app, configService);

  app.enableVersioning({ type: VersioningType.URI });
  app.setGlobalPrefix('api', { exclude: ['/', 'api'] });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpResponseInterceptor());

  await configureSwagger(app, configService);
  await app.listen(process.env.APP_PORT || 3000);
  console.log(`🚀🚀🚀 \x1b[36m Backend server running on: ${await app.getUrl()}\x1b[0m`);
}

bootstrap();
