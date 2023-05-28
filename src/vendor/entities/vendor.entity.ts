import { Asset } from 'src/assets/entities/asset.entity';
import { Category } from 'src/category/entities/category.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  // @ManyToOne(() => Category, (subCategory) => subCategory.vendor)
  // subCategory: Category[];

  @ManyToMany(() => Category, (subCategory) => subCategory.vendor, {
    cascade: true,
  })
  @JoinTable()
  subCategory: Category[];

  @ManyToOne(() => User, (user) => user.vendor)
  user: User;

  @ManyToOne(() => Organization, (organization) => organization.vendor)
  organization: Organization;

  @OneToMany(() => Asset, (asset) => asset.vendor)
  @JoinColumn({ name: 'subCategory', referencedColumnName: 'id' })
  asset: Asset;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
