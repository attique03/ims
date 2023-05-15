import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePasswordResetTokenDto } from './dto/create-password-reset-token.dto';
import { UpdatePasswordResetTokenDto } from './dto/update-password-reset-token.dto';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordResetTokenService {
  constructor(
    @InjectRepository(PasswordResetToken)
    private passwordResetRepository: Repository<PasswordResetToken>,
    private readonly configService: ConfigService,
  ) {
    SendGrid.setApiKey(process.env.SEND_GRID_KEY);
    // SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'))
  }

  async create(
    passwordReset: PasswordResetToken,
    mail: SendGrid.MailDataRequired,
  ): Promise<{ token: PasswordResetToken; mail: SendGrid.MailDataRequired }> {
    const newToken = this.passwordResetRepository.create({
      ...passwordReset,
      code: Math.random().toString(28).substr(2, 12),
    });
    mail.html = `<div>Use this Code to Reset Your Password: <br/> <b>${newToken.code}</b> </div>`;
    await SendGrid.send(mail);

    // token: await bcrypt.hash(Math.random().toString(28).substr(2, 12), 12),
    await this.passwordResetRepository.save(newToken);
    return { token: newToken, mail };
  }

  async verify(
    passwordReset: PasswordResetToken,
  ): Promise<{ passwordReset: PasswordResetToken; message: string }> {
    const { code } = passwordReset;
    const codeExists = await this.passwordResetRepository.findOneBy({ code });

    if (codeExists) {
      return { passwordReset: codeExists, message: 'success' };
    } else {
      return { passwordReset: codeExists, message: 'Code not Found' };
    }

    // if (userExists && (await bcrypt.compare(password, userExists.password))) {
    //   const token = generateToken(String(userExists.id));
    //   return { user: userExists, token };
    // }
  }

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
