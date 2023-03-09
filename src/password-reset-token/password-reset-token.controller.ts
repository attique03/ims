import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PasswordResetTokenService } from './password-reset-token.service';
import { CreatePasswordResetTokenDto } from './dto/create-password-reset-token.dto';
import { UpdatePasswordResetTokenDto } from './dto/update-password-reset-token.dto';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import * as SendGrid from '@sendgrid/mail';

@Controller('password-reset-token')
export class PasswordResetTokenController {
  constructor(
    private readonly passwordResetTokenService: PasswordResetTokenService,
  ) {}

  @Post()
  create(
    @Body() createPasswordResetTokenDto: CreatePasswordResetTokenDto,
    @Query('email') email,
  ) {
    console.log('Email ==> ', email);
    const mail = {
      to: email,
      subject: 'Greeting Message from NestJS Sendgrid',
      from: '<send_grid_email_address>',
      cc: '<send_grid_email_address>',
      text: 'Hello World from NestJS Sendgrid',
      html: '<h1>Hello World from NestJS Sendgrid</h1>',
    };
    return this.passwordResetTokenService.create(
      createPasswordResetTokenDto,
      mail,
    );
  }

  @Get()
  findAll() {
    return this.passwordResetTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passwordResetTokenService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordResetTokenDto: UpdatePasswordResetTokenDto,
  ) {
    return this.passwordResetTokenService.update(
      +id,
      updatePasswordResetTokenDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passwordResetTokenService.remove(+id);
  }
}
