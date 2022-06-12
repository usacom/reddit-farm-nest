import * as bcrypt from 'bcrypt';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>,
  ) {}

  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(ConfigService)
  private readonly config: ConfigService;

  public getUser(id: number): Promise<User> {
    return this.repository.findOneBy({ id: id });
  }

  public getUserByName(username: string): Promise<User> {
    return this.repository.findOneBy({ username: username });
  }

  public async createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();
    const salt = await bcrypt.genSalt(
      Number(this.config.get<number>('BCRYPT_SALTROUNDS')),
    );

    user.username = body.username;
    user.password = await bcrypt.hash(body.password, salt);

    user.refreshToken = body.refreshToken;

    return this.repository.save(user);
  }

  public async updateUser(id: number, body: UpdateUserDto): Promise<User> {
    await this.repository.update({ id }, body);

    return this.getUser(id);
  }
}
