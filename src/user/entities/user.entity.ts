import { Asset } from 'src/assets/entities/asset.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { Requests } from 'src/requests/entities/request.entity';
import { Role } from 'src/role/entities/role.entity';
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
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Complaint } from 'src/complaints/entities/complaint.entity';
import { Department } from 'src/department/entities/department.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  phone: string;

  @ManyToOne(() => Role, (role) => role.user)
  role: Role;

  // @ManyToOne(() => Department, (department) => department.user)
  // department: Department;

  @ManyToOne(() => Organization, (organization) => organization.user)
  organization: Organization;

  @OneToMany(() => Vendor, (vendor) => vendor.user)
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  vendor: Vendor;

  @OneToMany(() => Asset, (asset) => asset.employee)
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  asset: Asset;

  @OneToMany(() => Requests, (requests) => requests.user)
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  requests: Requests;

  @OneToMany(() => Complaint, (complaint) => complaint.user)
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  complaint: Complaint;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  //   @Column({ default: true })
  //   isActive: boolean;
}
