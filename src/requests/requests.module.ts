import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { Requests } from './entities/request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Requests])],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
