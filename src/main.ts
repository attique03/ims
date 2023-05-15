import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join, extname } from 'path';
import * as express from 'express';
import * as path from 'path';
import * as serveStatic from 'serve-static';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  await app.listen(4000);
}
bootstrap();
