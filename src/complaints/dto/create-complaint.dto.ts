import { User } from 'src/user/entities/user.entity';

export class CreateComplaintDto {
  readonly id: number;
  readonly description: string;
  readonly status: string;
  readonly image: string;
  readonly user: User;
  readonly createdDate: Date;
  readonly updatedDate: Date;
}
