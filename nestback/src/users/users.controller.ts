import { ValidationBodyPipe } from './../common/pipes/validation.body.pipe';
import { CreateTest } from './dto/test.dto';
import { ValidationPipe } from '../common/pipes/cumstom.validation.pipe';
import { UserInfo } from './UserInfo';
import { UserLoginRequest } from './dto/user-login.dto';
import { VerifyEmailRequest } from './dto/verify-email.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/test/:id')
  async testPipe2(@Param('id', ValidationPipe) id: number) {
    return true;
  }

  @Post('/test')
  async testPipe(@Body(ValidationBodyPipe) data: CreateTest): Promise<any> {
    console.log(data);
    return true;
  }

  @Post()
  async create(@Body() data: CreateUserRequest): Promise<any> {
    const { name, email, password } = data;
    return await this.usersService.create(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailRequest): Promise<string> {
    const { signupVerifyToken } = dto;

    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginRequest): Promise<string> {
    const { email, password } = dto;
    return await this.usersService.login(email, password);
  }

  @Get('/:id')
  async getUserInfo(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<UserInfo> {
    return await this.usersService.getUserInfo(userId);
  }
}
