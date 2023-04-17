import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  // imports: [
  //   MulterModule.register({
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, callback) => {
  //         const name = file.originalname.split('.')[0];
  //         const fileExtName = extname(file.originalname);
  //         const randomName = Array(4)
  //           .fill(null)
  //           .map(() => Math.round(Math.random() * 16).toString(16))
  //           .join('');
  //         callback(null, `${name}-${randomName}${fileExtName}`);
  //       },
  //     }),
  //   }),
  // ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
