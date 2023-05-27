import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import generateToken from 'src/utils/generateToken';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { ADMIN, EMPLOYEE, SUPERADMIN } from 'src/constants/constants';
import { Asset } from 'src/assets/entities/asset.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    private readonly configService: ConfigService,
  ) {
    SendGrid.setApiKey(process.env.SEND_GRID_KEY);
  }

  async findAll(req) {
    // Fetch Admins || Employees based on specific organization
    if (req?.user.role.role === ADMIN) {
      console.log('Here ');
      const organizationId = req?.user?.organization?.id;
      return await this.userRepository
        .createQueryBuilder('user')
        .leftJoin('user.department', 'department')
        .select(['user.name', 'user.email', 'user.phone'])
        .addSelect('user.id', 'id')
        .addSelect('department.name', 'department')
        .where('user.organizationId = :organizationId', { organizationId })
        .andWhere('user.roleId = :roleId', {
          roleId: 3,
          // roleId: req?.user.role.id === 1 ? 2 : req?.user.role.id === 2 ? 3 : 0,
        })
        .getRawMany();
    } else if (req?.user.role.role === SUPERADMIN) {
      // Fetch only admins of any Organization if Super Admin is logged in
      return await this.userRepository
        .createQueryBuilder('user')
        .select(['user.image', 'user.name', 'user.email', 'user.phone'])
        .addSelect('user.id', 'id')
        .addSelect('organization.name', 'organization')
        .leftJoin('user.organization', 'organization')
        .where('user.roleId = :roleId', {
          roleId: 2,
          // roleId: req?.user.role.id === 1 ? 2 : req?.user.role.id === 2 ? 3 : 0,
        })
        .getRawMany();
    }
    throw new ForbiddenException('Not Allowed to fecth users');
  }

  async create(
    user: User,
    req,
    mail: SendGrid.MailDataRequired,
  ): Promise<User> {
    const newUser = this.userRepository.create({
      ...user,
      password: await bcrypt.hash(user.password, 12),
      role:
        req.user.role.id === 1
          ? req?.user?.role?.id + 1
          : req?.user?.role?.id === 2
          ? req?.user?.role?.id + 1
          : req?.user?.role?.id - 3,
    });

    mail.html = `<div>
                  <h1>Welcome to the Inventory Management System</h1>
                  <br/>
                  <span>Below is your Login Credentials to login to IMS</span>
                  <br/>
                  <span>Remember not to share this with anyone.</span>
                  <br/> 
                  Email: <b>${user.email}</b> 
                  <br/> 
                  Password: <b>${user.password}</b>
                </div>`;
    await SendGrid.send(mail);

    return await this.userRepository.save(newUser);
  }

  // @Login User
  async login(user: User): Promise<{ user: User; token: string }> {
    const { email, password } = user;

    const userExists = await this.userRepository.findOne({
      where: { email },
      relations: ['role', 'organization'],
    });

    if (userExists && (await bcrypt.compare(password, userExists.password))) {
      const token = generateToken(String(userExists.id));
      return { user: userExists, token };
    } else {
      throw new NotAcceptableException('Email or password incorrect');
    }
  }

  async resetPassword(email: string, user?: User) {
    const { password } = user;

    let userFound = await this.userRepository.findOneBy({ email });

    if (!userFound) {
      throw new NotFoundException('User Not Found');
    } else {
      userFound = { ...userFound, password: await bcrypt.hash(password, 12) };
      // user.password = await bcrypt.hash(String(password), Number(12));

      return this.userRepository.save(userFound);

      // return {
      //   user: await this.userRepository.save(userUpdate),
      //   message: 'Password reset successfully',
      // };
    }
  }

  async findOne(id: number, @Req() request): Promise<User> {
    if (request.user.role.role === SUPERADMIN) {
      const user = await this.userRepository.findOne({
        where: { id },
        select: [
          'id',
          'image',
          'name',
          'email',
          'phone',
          'createdDate',
          'updatedDate',
        ],
        relations: ['role', 'organization'],
      });
      const isAdmin = user.role.role === ADMIN;
      return isAdmin ? user : null;
    } else if (request.user.role.role === ADMIN) {
      const user = await this.userRepository.findOne({
        where: { id },
        // select: [
        //   'id',
        //   'image',
        //   'name',
        //   'email',
        //   'phone',
        //   'createdDate',
        //   'updatedDate',
        // ],
        relations: ['role', 'organization', 'department'],
      });
      const isEmployee = user?.role?.role === EMPLOYEE;
      return isEmployee ? user : null;
    } else {
      throw new ForbiddenException('Not Authozied');
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
