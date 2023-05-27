import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class authMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //fetching User
        req.user = await this.userRepository.findOne({
          where: { id: decoded.id },
          relations: ['role', 'organization'],
        });

        return next();
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Not Authorized, Token Failed',
          },
          HttpStatus.FORBIDDEN,
          {
            cause: error,
          },
        );
      }
    }

    if (!token) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Not Authorized, No token',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: null,
        },
      );
    }
    return next();
  }
}
