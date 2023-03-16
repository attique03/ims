// import { Item } from 'src/item/entity/item.entity';
// import { Organization } from 'src/organization/entity/organization.entity';
// import { Vendor } from 'src/vendor/entity/vendor.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @ManyToOne(() => Category, (category) => category.children)
  parent: Category;

  //   @ManyToOne(() => Organization, (organization) => organization.categories, {})
  //   organization: Organization;
}
