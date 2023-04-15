import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/utils/auth.guard';
import { Users } from './user.decorator';

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
    console.log('Login Controller ', user);
    return this.userService.login(user);
  }

  @Patch('/resetPassword')
  resetPassword(@Body() user: User): Promise<{ user: User }> {
    return this.userService.resetPassword(user);
  }

  @Get()
  // @UseGuards(AuthGuard)
  findAll(@Req() req /* @Param('organizationId') organizationId */) {
    return this.userService.findAll(req);
  }

  @Get(':id')
  async findOne(@Req() request, @Param('id') id): Promise<User> {
    const user = await this.userService.findOne(id);
    request.user = user;
    return user;
  }

  // async getUserByEmail(@Req() request, @Param('email') email: string) {
  //   const user = await this.userService.findByEmail(email);
  //   request.user = user;
  //   return user;
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
