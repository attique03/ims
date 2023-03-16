import { User } from 'src/user/entities/user.entity';
import * as SendGrid from '@sendgrid/mail';

export class CreatePasswordResetTokenDto {
  readonly id: number;
  readonly email: string;
  readonly code: string;
  readonly expiresIn: Date;
  // readonly mail: SendGrid.MailDataRequired;
  readonly createdDate: Date;
  readonly updatedDate: Date;
}
