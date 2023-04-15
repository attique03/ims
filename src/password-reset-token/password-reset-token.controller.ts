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
    const mail = {
      to: email,
      subject: 'Password Reset Code | IMS Password Reset',
      from: 'muhammad.attique@gigalabs.co',
      text: 'Password Reset Code | IMS Password Reset',
      // html: '<div>Hello World from NestJS Sendgrid</div>',
    };

    console.log('Email ==> ', email);

    return this.passwordResetTokenService.create(
      createPasswordResetTokenDto,
      mail,
    );
  }

  @Post('/verify')
  login(
    @Body() passwordReset: PasswordResetToken,
  ): Promise<{ passwordReset: PasswordResetToken }> {
    return this.passwordResetTokenService.verify(passwordReset);
  }

  // @Post('/verify')
  // verify(@Body() code: string): Promise<string> {
  //   return this.passwordResetTokenService.verify(code);
  // }

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
