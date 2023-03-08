import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePasswordResetTokenDto } from './dto/create-password-reset-token.dto';
import { UpdatePasswordResetTokenDto } from './dto/update-password-reset-token.dto';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordResetTokenService {
  constructor(
    @InjectRepository(PasswordResetToken)
    private passwordResetRepository: Repository<PasswordResetToken>,
  ) {}

  async create(passwordReset: PasswordResetToken): Promise<PasswordResetToken> {
    const newToken = this.passwordResetRepository.create({
      ...passwordReset,
      token: await bcrypt.hash(Math.random().toString(28).substr(2, 12), 12),
    });

    return newToken;
    // return await this.passwordResetRepository.save(newToken);
  }

  // newUser = this.userRepository.create({
  //   ...user,
  //   password: await bcrypt.hash(user.password, 12),
  // });

  findAll() {
    return `This action returns all passwordResetToken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passwordResetToken`;
  }

  update(id: number, updatePasswordResetTokenDto: UpdatePasswordResetTokenDto) {
    return `This action updates a #${id} passwordResetToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} passwordResetToken`;
  }
}
