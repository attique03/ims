import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateDepartmentDto {
  readonly id: number;
  readonly name: string;
  readonly organization: Organization;
  readonly user: User;
  readonly createdDate: Date;
  readonly updatedDate: Date;
}
