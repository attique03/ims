import { Asset } from 'src/assets/entities/asset.entity';
import { Complaint } from 'src/complaints/entities/complaint.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { PasswordResetToken } from 'src/password-reset-token/entities/password-reset-token.entity';
import { Requests } from 'src/requests/entities/request.entity';
import { Role } from 'src/role/entities/role.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';

export class CreateUserDto {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly phone: string;
  readonly image: string;
  readonly role: Role;
  readonly vendor: Vendor;
  readonly organization: Organization;
  readonly resetPassword: PasswordResetToken;
  readonly asset: Asset;
  readonly requests: Requests;
  readonly complaint: Complaint;
  readonly createdDate: Date;
  readonly updatedDate: Date;
}
