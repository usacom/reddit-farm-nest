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
import { RedditService } from '../../shared/reddit/reddit.service';
import { RegUserDto, CreateUserDto } from '../user/user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from '../user/user.entity';

@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Inject(RedditService)
  private redditService: RedditService;

  @Post('/reg')
  public createUser(@Body() regUserDto): Promise<User> {
    console.log('regUserDto', regUserDto);
    return this.userService.createUser(regUserDto);
  }

  @Get('/link')
  public getLink() {
    return this.redditService.getAuthUrl();
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
