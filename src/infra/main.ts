import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from './env';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const configService = app.get<ConfigService<EnvSchema, true>>(ConfigService);
  const port = configService.get('PORT', { infer: true });

  await app.listen(port, () => {
    logger.log(`Server is running on PORT ${port}`, 'NestApplication');
  });
}

bootstrap();
