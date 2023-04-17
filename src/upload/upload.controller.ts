import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Header,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { extname } from 'path';
import multer = require('multer');

export const storage = {
  storage: diskStorage({
    destination: './frontend/public/uploads',
    filename: (req, file: any, cb) => {
      const filename = `${file.fieldname}-${Date.now()}`;
      // path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),

  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extnamee = filetypes.test(extname(file.originalname).toLowerCase());

    if (mimetype && extnamee) {
      console.log('akjakna ds => ', mimetype, extnamee);
      return cb(null, true);
    }
    cb(new Error('Images Only'));
  },
};

// new ParseFilePipe({
//   validators: [
//     new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
//     new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
//   ],
// }),
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', storage))
  @Header('Content-Type', 'image/jpeg')
  uploadFile(
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    console.log('File Uploaded ===> ', image);
    return image.path;
  }

  @Post('create')
  create(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadService.create(createUploadDto);
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
