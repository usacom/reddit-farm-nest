import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug'],
  });
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('BACKEND_PORT');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api/v1', {
    exclude: ['/'],
  });
  await app.listen(port, () => {
    console.log('[BACKEND_PORT]', config.get<string>('BACKEND_PORT'));
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
}

bootstrap();
