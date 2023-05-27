import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { authMiddleware } from 'src/utils/authMiddleware';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Asset } from 'src/assets/entities/asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Asset])],
  controllers: [UserController],
  providers: [UserService, ConfigService],
  exports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
