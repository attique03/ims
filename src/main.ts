import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join, extname } from 'path';
import * as express from 'express';
import * as path from 'path';
import * as serveStatic from 'serve-static';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add middleware to serve images with the correct MIME type
  // app.use('/uploads', (req, res, next) => {
  //   const ext = extname(req.path);
  //   console.log('Ext ==> ', req.path);
  //   if (ext === '.jpg') {
  //     res.setHeader('Content-Type', 'image/jpeg');
  //   } else if (ext === '.png') {
  //     res.setHeader('Content-Type', 'image/png');
  //   }
  //   next();
  // });
  // Serve static files from the "static" directoryy
  // app.use('/uploads', serveStatic(path.join(__dirname, '/uploads')));
  // const __dirname = path.resolve();
  // console.log('DirName ', join(__dirname, '/uploads'));
  // app.use('/uploads', express.static(join(__dirname, '/uploads')));
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
