import { Category } from 'src/category/entities/category.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/user/entities/user.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';

export class CreateAssetDto {
  readonly id: number;
  readonly name: string;
  readonly serial_number: number;
  readonly description: string;
  readonly price: number;
  readonly organization: Organization;
  readonly vendor: Vendor;
  readonly employee: User;
  readonly subCategory: Category;
  readonly createdDate: Date;
  readonly updatedDate: Date;
}
