import {
  ForbiddenException,
  forwardRef,
  Injectable,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import generateToken from 'src/utils/generateToken';
import { getConnection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { selectUserColumns } from 'src/constants/userConstants/userConstants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    SendGrid.setApiKey(process.env.SEND_GRID_KEY);
  }

  // const orders = await this.userRepository
  // .createQueryBuilder('user')
  // .leftJoinAndSelect('user.organization', 'organization')
  // .getMany();

  // .innerJoinAndSelect(
  //   'user.organization',
  //   'organization',
  //   'organization.id = :organizationId',
  //   { organizationId },
  // )
  async findAll(req) {
    console.log('Req in Service ===> ', req?.user.role.id + 1);

    // Fetch Admins || Employees based on specific organization
    if (req?.query?.organizationId) {
      const organizationId = req.query.organizationId;
      return await this.userRepository
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.image',
          'user.name',
          'user.email',
          'user.phone',
        ])
        .where('user.organizationId = :organizationId', { organizationId })
        .andWhere('user.roleId = :roleId', {
          roleId: req?.user.role.id === 1 ? 2 : req?.user.role.id === 2 ? 3 : 0,
        })
        .getMany();
    }

    // Fetch only admins of any Organization if Super Admin is logged in
    return await this.userRepository
      .createQueryBuilder('user')
      .select(['user.image', 'user.name', 'user.email', 'user.phone'])
      .addSelect('user.id', 'id')
      .addSelect('organization.name', 'organization')
      .leftJoin('user.organization', 'organization')
      .where('user.roleId = :roleId', {
        roleId: req?.user.role.id === 1 ? 2 : req?.user.role.id === 2 ? 3 : 0,
      })
      // .where('user.organizationId = :organizationId', {
      //   organizationId: req?.user?.organization?.id,
      // })
      .getRawMany();

    // return await this.userRepository.find({
    //   relations: ['role', 'organization'],
    // });
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
          ? req?.user.role.id + 1
          : req.user.role.id === 2
          ? req.user.role.id + 1
          : req.user.role.id - 3,
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
    console.log('Login Service ', user);
    // const userExists = await this.userRepository.findOneBy({ email });
    const userExists = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });

    if (userExists && (await bcrypt.compare(password, userExists.password))) {
      const token = generateToken(String(userExists.id));
      return { user: userExists, token };
    }
  }

  async resetPassword(user: User): Promise<{ user: User; message: string }> {
    let userUpdate = await this.userRepository.findOneBy({ id: user.id });

    if (!userUpdate) {
      throw new NotFoundException('User Not Found');
    } else {
      userUpdate = user;
      return {
        user: await this.userRepository.save(userUpdate),
        message: 'Password reset successfully',
      };
    }
  }

  async findOne(id: number, @Req() request): Promise<User> {
    if (request.user.role.role === 'superadmin') {
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
      const isAdmin = user.role.role === 'admin';
      return isAdmin ? user : null;
    } else if (request.user.role.role === 'admin') {
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
        relations: ['role', 'oragnization'],
      });
      const isAdmin = user.role.role === 'employee';
      return isAdmin ? user : null;
    } else {
      throw new ForbiddenException('Not Authozied');
    }

    // if (!user) throw new NotFoundException('User Not Found');
    // return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
