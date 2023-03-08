import { User } from 'src/user/entities/user.entity';

export class CreatePasswordResetTokenDto {
  readonly id: number;
  readonly email: string;
  readonly token: string;
  readonly expiresIn: Date;
  readonly user: User;
  readonly createdDate: Date;
  readonly updatedDate: Date;
}
