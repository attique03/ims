import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
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
  create(@Body() createPasswordResetTokenDto: CreatePasswordResetTokenDto) {
    return this.passwordResetTokenService.create(createPasswordResetTokenDto);
  }

  @Post('/verify')
  verify(
    @Body() passwordReset: PasswordResetToken,
    @Req() req,
  ): Promise<{ passwordReset?: PasswordResetToken }> {
    return this.passwordResetTokenService.verify(passwordReset, req);
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
