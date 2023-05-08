import { Asset } from 'src/assets/entities/asset.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { Requests } from 'src/requests/entities/request.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @ManyToOne(() => Organization, (organization) => organization.category)
  organization: Organization;

  @OneToMany(() => Vendor, (vendor) => vendor.subCategory)
  @JoinColumn({ name: 'subCategory', referencedColumnName: 'id' })
  vendor: Vendor;

  @OneToMany(() => Asset, (asset) => asset.subCategory)
  @JoinColumn({ name: 'subCategory', referencedColumnName: 'id' })
  asset: Asset;

  @OneToMany(() => Requests, (requests) => requests.subCategory)
  @JoinColumn({ name: 'subCategory', referencedColumnName: 'id' })
  requests: Requests;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
