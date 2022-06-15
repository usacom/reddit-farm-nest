import * as bcrypt from 'bcrypt';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { RegUserDto, CreateUserDto, UpdateUserDto } from './user.dto';
import { Token } from './token.entity';
import { ConfigService } from '@nestjs/config';
import { RedditService } from '../../shared/reddit/reddit.service';
import { User } from '../user/user.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly TokenRepository: Repository<Token>,
  ) {}

  @InjectRepository(Token)
  private readonly repository: Repository<Token>;

  @Inject(ConfigService)
  private readonly config: ConfigService;

  @Inject(RedditService)
  private readonly redditService: RedditService;

  public createUserToken(user: User, data): Promise<Token> {
    const token: Token = new Token();
    token.user = user;
    token.accessToken = data.accessToken;
    token.refreshToken = data.refreshToken;
    return this.repository.save(token);
  }
  public createToken(data): Promise<Token> {
    const token: Token = new Token();
    token.accessToken = data.accessToken;
    token.refreshToken = data.refreshToken;
    return this.repository.save(token);
  }
  public getUserToken(id): Promise<Token> {
    return this.repository.findOneBy({ user: { id } });
  }
}
