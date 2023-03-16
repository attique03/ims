// import { Organization } from 'src/organization/entities/organization.entity';
// import { PasswordResetToken } from 'src/password-reset-token/entities/password-reset-token.entity';
// import { Role } from 'src/role/entities/role.entity';

import { Category } from '../entities/category.entity';

export class CreateCategoryDto {
  readonly id: number;
  readonly name: string;
  readonly children: Category[];
  readonly parent: Category;
  //   readonly organization: Organization;
  readonly createdDate: Date;
  readonly updatedDate: Date;
}
