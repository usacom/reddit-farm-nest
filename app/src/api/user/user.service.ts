import * as bcrypt from 'bcrypt';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegUserDto, CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { RedditService } from '../../shared/reddit/reddit.service';
import { TokenService } from '../token/token.service';
// import { Token } from '../token/token.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(ConfigService)
  private readonly config: ConfigService;

  @Inject(RedditService)
  private readonly redditService: RedditService;

  @Inject(TokenService)
  private readonly tokenService: TokenService;

  public getUser(id: number): Promise<User> {
    return this.repository.createQueryBuilder('user')
      .leftJoinAndSelect("user.tokens", "token")
      .where("user.id = :id", { id })
      .getOne();

    // return this.repository.findOne({ where: { id }, relations: { tokens: true, },});
  }

  public getUserByName(username: string): Promise<User> {
    return this.repository.findOneBy({ username: username });
  }

  public async createUser(body: RegUserDto): Promise<User> {
    const tokenData = await this.redditService.getRefreshToken(body.code);
    console.log('data', tokenData);
    const r = this.redditService.createRedditService(tokenData.refreshToken);
    let userData = null;
    await this.redditService.getInfoAboutMySelf(r).then((userInfo) => {
      console.log('userinfo', userInfo);
      userData = userInfo;
    });

    console.log('userData', userData);
    const user: User = new User();

    const salt = await bcrypt.genSalt(
      Number(this.config.get<number>('BCRYPT_SALTROUNDS')),
    );
    const token = await this.tokenService.createToken(tokenData);
    user.tokens = [token];
    user.username = userData.name;
    user.password = await bcrypt.hash(body.password, salt);

    // user

    return this.repository.save(user);
  }

  public async updateUser(id: number, body: UpdateUserDto): Promise<User> {
    await this.repository.update({ id }, body);

    return this.getUser(id);
  }
}
