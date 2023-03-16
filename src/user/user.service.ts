import {
  forwardRef,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import generateToken from 'src/utils/generateToken';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/utils/auth.guard';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll() {
    return `This action returns all userssss`;
  }

  async create(user: User): Promise<User> {
    const newUser = this.userRepository.create({
      ...user,
      password: await bcrypt.hash(user.password, 12),
    });

    return await this.userRepository.save(newUser);
  }

  // @Login User
  async login(user: User): Promise<{ user: User; token: string }> {
    const { email, password } = user;
    const userExists = await this.userRepository.findOneBy({ email });

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

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
