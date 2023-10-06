import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { SwaggerTheme } from "swagger-themes";

export async function configureSwagger(
	app: NestFastifyApplication,
	configService?: ConfigService,
) {
	const config = configService.get('app');
    const opts = new DocumentBuilder()
                        .setTitle(config.name)
                        .setDescription(config.description)
                        .setVersion(config.version)
                        .build();

    const document = SwaggerModule.createDocument(app, opts);
    const theme = new SwaggerTheme('v3');

    SwaggerModule.setup('api/v1/doc', app, document, {
        customCss: theme.getBuffer('feeling-blue'),
    });
}