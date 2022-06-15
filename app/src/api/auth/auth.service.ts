import * as bcrypt from 'bcrypt';
import { Injectable, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Inject(ConfigService)
  private readonly config: ConfigService;

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByName(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    return {
      access_token: this.jwtService.sign({
        id: user.id,
        username: user.username,
      }),
    };
  }
}
