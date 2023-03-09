import { Module } from '@nestjs/common';
import { PasswordResetTokenService } from './password-reset-token.service';
import { PasswordResetTokenController } from './password-reset-token.controller';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordResetToken])],
  controllers: [PasswordResetTokenController],
  providers: [PasswordResetTokenService, ConfigService],
})
export class PasswordResetTokenModule {}
