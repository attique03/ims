import { Asset } from 'src/assets/entities/asset.entity';
import { Requests } from 'src/requests/entities/request.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import {
  Column,
  Entity,
  JoinColumn,
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

  @OneToMany(() => Vendor, (vendor) => vendor.subCategory)
  @JoinColumn({ name: 'subCategory', referencedColumnName: 'id' })
  vendor: Vendor;

  @OneToMany(() => Asset, (asset) => asset.subCategory)
  @JoinColumn({ name: 'subCategory', referencedColumnName: 'id' })
  asset: Asset;

  @OneToMany(() => Requests, (requests) => requests.subCategory)
  @JoinColumn({ name: 'subCategory', referencedColumnName: 'id' })
  requests: Requests;
}
