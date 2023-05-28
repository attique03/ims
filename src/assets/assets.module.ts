import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { Asset } from './entities/asset.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, User])],
  controllers: [AssetsController],
  providers: [AssetsService],
  exports: [TypeOrmModule.forFeature([Asset])],
})
export class AssetsModule {}
