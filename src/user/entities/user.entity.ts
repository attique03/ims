import { Organization } from 'src/organization/entities/organization.entity';
import { PasswordResetToken } from 'src/password-reset-token/entities/password-reset-token.entity';
import { Role } from 'src/role/entities/role.entity';
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
import { isEmail } from 'validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  image: string;

  @ManyToOne(() => Role, (role) => role.user)
  role: Role;

  @ManyToOne(() => Organization, (organization) => organization.user)
  organization: Organization;

  // @OneToMany(() => PasswordResetToken, (resetPassword) => resetPassword.user)
  // @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  // resetPassword: PasswordResetToken;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  //   @Column({ default: true })
  //   isActive: boolean;
}
