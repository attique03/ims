import { Asset } from 'src/assets/entities/asset.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { Requests } from 'src/requests/entities/request.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import { Category } from '../entities/category.entity';
export class CreateCategoryDto {
  readonly id: number;
  readonly name: string;
  readonly children: Category[];
  readonly parent: Category;
  readonly vendor: Vendor;
  readonly asset: Asset;
  readonly requests: Requests;
  readonly organization: Organization;
  readonly createdDate: Date;
  readonly updatedDate: Date;
}
