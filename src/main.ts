import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { AppModule} from './app.module';
import path from 'path';
const cookieSession =  require ('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      name: 'session',
      keys: ['ey123123'],
      domain: '127.0.0.1',
      path: '/',
      httpOnly: false,
      // sameSite: 'None',
      //  secure: true,
    }),
  );
  app.enableCors({
    origin: 'http://127.0.0.1:3000',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001, '0.0.0.0');
}
bootstrap();
