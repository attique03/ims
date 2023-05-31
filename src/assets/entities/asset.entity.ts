import { Category } from 'src/category/entities/category.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/user/entities/user.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  serial_number: number;

  @Column()
  description: string;

  @Column()
  price: number;

  // Assigned to this employee
  @ManyToOne(() => User, (employee) => employee.asset)
  employee: User;

  // Asset of this category
  @ManyToOne(() => Category, (subCategory) => subCategory.asset, {
    nullable: true,
  })
  subCategory: Category;

  // Asset from this Vendor
  @ManyToOne(() => Vendor, (vendor) => vendor.asset)
  vendor: Vendor;

  @ManyToOne(() => Organization, (organization) => organization.asset)
  organization: Organization;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
