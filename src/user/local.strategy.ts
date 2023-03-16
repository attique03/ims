import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }

  async validate(user: User): Promise<any> {
    const userExists = await this.userService.login(user);
    console.log('Inside local Strategy', userExists);
    if (!userExists) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
