import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateRequestDto {
  readonly id: number;
  readonly itemName: string;
  readonly type: string;
  readonly returnType: string;
  readonly description: string;
  readonly subCategory: Category;
  readonly user: User;
  readonly status: string;
  readonly createdDate: Date;
  readonly updatedDate: Date;
}