import { Asset } from 'src/assets/entities/asset.entity';
import { Category } from 'src/category/entities/category.entity';
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
} from 'typeorm';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @ManyToOne(() => Category, (subCategory) => subCategory.vendor)
  subCategory: Category;

  @ManyToOne(() => User, (user) => user.vendor)
  user: User;

  @OneToMany(() => Asset, (asset) => asset.vendor)
  @JoinColumn({ name: 'subCategory', referencedColumnName: 'id' })
  asset: Asset;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
