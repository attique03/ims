import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateComplaintDto {
  readonly id: number;
  readonly title: string | null;
  readonly description: string;
  readonly status: string;
  readonly image: string;
  readonly user: User;
  readonly organization: Organization;
  readonly createdDate: Date;
  readonly updatedDate: Date;
}
