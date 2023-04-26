import { Category } from 'src/category/entities/category.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string | null;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.complaint)
  user: User;

  @ManyToOne(() => Organization, (organization) => organization.complaint)
  organization: Organization;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
