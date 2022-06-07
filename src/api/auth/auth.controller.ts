import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from '../user/user.entity';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @Post('/reg')
  public createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
