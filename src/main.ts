import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets(join(process.cwd(), 'fotosmovies'), {
    prefix: '/fotosmovies/',
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))
  await app.listen(4000);
  app.enableCors({
    origin: process.env.FRONTEND_URL,
  });
}

bootstrap();

console.log('URL DB:', process.env.DATABASE_URL);
