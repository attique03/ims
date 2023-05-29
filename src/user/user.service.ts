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
        .orderBy('user.id', 'DESC')
        .getRawMany();
    } else if (req?.user.role.role === SUPERADMIN) {
      // Fetch only admins of any Organization if Super Admin is logged in

      if (req.query.organizationId) {
        return await this.userRepository
          .createQueryBuilder('user')
          .select(['user.image', 'user.name', 'user.email', 'user.phone'])
          .addSelect('user.id', 'id')
          .addSelect('organization.name', 'organization')
          .leftJoin('user.organization', 'organization')
          .where('user.roleId = :roleId', {
            roleId: 2,
          })
          .where('user.organizationId = :organizationId', {
            organizationId: req.query.organizationId,
          })
          .orderBy('user.id', 'DESC')
          .getRawMany();
      }
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
        .orderBy('user.id', 'DESC')
        .getRawMany();
    }
    throw new ForbiddenException('Not Allowed to fecth users');
  }

  async create(
    user: User,
    req,
    mail: SendGrid.MailDataRequired,
  ): Promise<User> {
    console.log('sdlkasj ', user);
    if (
      user.email &&
      user.image &&
      user.password &&
      user.name &&
      user.organization &&
      user.phone &&
      req.query.email
    ) {
      const newUser = this.userRepository.create({
        ...user,
        password: await bcrypt.hash(user.password, 12),
        organization: req.user.organization.id,
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
    } else {
      throw new NotAcceptableException(
        'Please fill all of the required fields',
      );
    }
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
    } else if (request.user.role.role === EMPLOYEE) {
      return await this.userRepository.findOne({
        where: { id },
        relations: ['department'],
      });
    } else throw new ForbiddenException('Not Authozied');
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    console.log('updateUser ', updateUserDto, id);
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    if (updateUserDto.password) {
      console.log('update user password', updateUserDto.password);
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
    }

    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      relations: ['vendor', 'complaint', 'asset', 'requests'],
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.complaint = null;
    user.asset = null;
    user.vendor = null;
    user.requests = null;

    await this.userRepository.save(user);
    return await this.userRepository.remove(user);
  }
}
