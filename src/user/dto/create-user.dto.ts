import { Organization } from 'src/organization/entities/organization.entity';
import { PasswordResetToken } from 'src/password-reset-token/entities/password-reset-token.entity';
import { Role } from 'src/role/entities/role.entity';

export class CreateUserDto {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly phone: string;
  readonly image: string;
  readonly role: Role;
  readonly organization: Organization;
  readonly resetPassword: PasswordResetToken;
  readonly createdDate: Date;
  readonly updatedDate: Date;
}
