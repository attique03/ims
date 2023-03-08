import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import generateToken from 'src/utils/generateToken';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

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

  async forgotPassword(email: string): Promise<string> {
    const token = Math.random().toString(28).substr(2, 12);
    return token;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
