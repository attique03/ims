import { PartialType } from '@nestjs/mapped-types';
import { CreatePasswordResetTokenDto } from './create-password-reset-token.dto';

export class UpdatePasswordResetTokenDto extends PartialType(CreatePasswordResetTokenDto) {}
