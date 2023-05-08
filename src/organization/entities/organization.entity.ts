import { Asset } from 'src/assets/entities/asset.entity';
import { Category } from 'src/category/entities/category.entity';
import { Complaint } from 'src/complaints/entities/complaint.entity';
import { Role } from 'src/role/entities/role.entity';
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
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  image: string;

  @Column()
  bio: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  zip: number;

  @Column()
  representativeName: string;

  @Column()
  representativeContact: string;

  @OneToMany(() => User, (user) => user.organization)
  @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => Complaint, (complaint) => complaint.organization)
  @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
  complaint: Complaint;

  @OneToMany(() => Asset, (asset) => asset.organization)
  @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
  asset: Asset;

  @OneToMany(() => Vendor, (vendor) => vendor.organization)
  @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
  vendor: Vendor;

  @OneToMany(() => Category, (category) => category.organization)
  @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
  category: Category;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  //   @Column({ default: true })
  //   isActive: boolean;
}
