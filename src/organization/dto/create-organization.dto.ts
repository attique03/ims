import { Asset } from 'src/assets/entities/asset.entity';
import { Category } from 'src/category/entities/category.entity';
import { Complaint } from 'src/complaints/entities/complaint.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/user/entities/user.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';

export class CreateOrganizationDto {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly image: string;
  readonly bio: string;
  readonly address: string;
  readonly city: string;
  readonly country: string;
  readonly zip: number;
  readonly representativeName: string;
  readonly representativeContact: string;
  readonly user: User;
  readonly complaint: Complaint;
  readonly asset: Asset;
  readonly vendor: Vendor;
  readonly category: Category;
  readonly createdDate: Date;
  readonly updatedDate: Date;
}
