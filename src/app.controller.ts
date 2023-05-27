import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @UseGuards(AuthGuard('local'))
  // @Post('user')
  // async login(@Request() req) {
  //   return req.user;
  // }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
