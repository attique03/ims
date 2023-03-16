import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from './user.service';

export const Users = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    // const userId = request.user.id;
    // const userService = new UserService();
    // return userService.findOne(userId);

    console.log('User ===>  ', request.user, data);

    return request.user;
  },
);
