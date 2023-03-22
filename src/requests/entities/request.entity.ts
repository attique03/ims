import { Category } from 'src/category/entities/category.entity';
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
export class Requests {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemName: string;

  @Column()
  type: string;

  @Column()
  returnType: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @ManyToOne(() => Category, (subCategory) => subCategory.requests)
  subCategory: Category;

  @ManyToOne(() => User, (user) => user.requests)
  user: User;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}