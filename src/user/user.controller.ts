import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @Req() req,
    @Query('email') email,
  ) {
    const mail = {
      to: email,
      subject: 'Login Credentials | Inventory Management System',
      from: 'muhammad.attique@gigalabs.co',
      text: 'Password Reset Code | IMS Password Reset',
      // html: '<div>Hello World from NestJS Sendgrid</div>',
    };
    return this.userService.create(createUserDto, req, mail);
  }

  @Post('/login')
  login(@Body() user: User): Promise<{ user: User }> {
    return this.userService.login(user);
  }

  @Patch('/resetPassword')
  resetPassword(@Query('email') email, @Body() user: User) {
    return this.userService.resetPassword(email, user);
  }

  @Get()
  findAll(@Req() req) {
    return this.userService.findAll(req);
  }

  @Get(':id')
  async findOne(@Req() request, @Param('id') id): Promise<User> {
    return await this.userService.findOne(id, request);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
