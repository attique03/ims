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

  async create(passwordReset: PasswordResetToken): Promise<{ email: string }> {
    const newToken = this.passwordResetRepository.create({
      ...passwordReset,
      code: Math.random().toString(28).substr(2, 12),
    });
    const mail = {
      to: passwordReset.email,
      subject: 'Password Reset Code | IMS Password Reset',
      from: 'muhammad.attique@gigalabs.co',
      text: 'Password Reset Code | IMS Password Reset',
      html: `<div>Use this Code to Reset Your Password: <br/> <b>${newToken.code}</b> </div>`,
    };
    await SendGrid.send(mail);

    // token: await bcrypt.hash(Math.random().toString(28).substr(2, 12), 12),
    await this.passwordResetRepository.save(newToken);
    return { email: passwordReset.email };
  }

  async verify(
    passwordReset: PasswordResetToken,
    req,
  ): Promise<{ passwordReset?: PasswordResetToken; message: string }> {
    const { code } = passwordReset;
    console.log('Here  ', code);
    const codeExists = await this.passwordResetRepository.findOneBy({ code });

    // console.log(
    //   'Code Existsss ',
    //   codeExists.email,
    //   req.query.email,
    //   codeExists.email === req.query.email,
    // );

    if (codeExists && codeExists.email === req.query.email) {
      return { passwordReset: codeExists, message: 'success' };
    } else {
      return { message: 'Code not Found' };
    }

    // if (userExists && (await bcrypt.compare(password, userExists.password))) {
    //   const token = generateToken(String(userExists.id));
    //   return { user: userExists, token };
    // }
  }

  findAll() {
    return `This action returns all passwordResetTokennn`;
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
