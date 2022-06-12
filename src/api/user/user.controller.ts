import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get('/profile')
  getProfile(@Request() req) {
    const result = this.service.getUser(req.user.userId);
    return result;
  }

  @Put('/')
  updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    console.log('req.user', req.user);
    const result = this.service.updateUser(req.user.userId, updateUserDto);
    return result;
  }

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getUser(id);
  }

  // @Post()
  // public createUser(@Body() body: CreateUserDto): Promise<User> {
  //   return this.service.createUser(body);
  // }
}
