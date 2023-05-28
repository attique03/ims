import { Asset } from 'src/assets/entities/asset.entity';
import { Category } from 'src/category/entities/category.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateVendorDto {
  readonly id: number;
  readonly name: string;
  readonly phone: string;
  readonly subCategory: Category[];
  readonly organization: Organization;
  readonly user: User;
  readonly asset: Asset;
  readonly createdDate: Date;
  readonly updatedDate: Date;
}
