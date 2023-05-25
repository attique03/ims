import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { Requests } from './entities/request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from 'src/assets/entities/asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Requests, Asset])],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
