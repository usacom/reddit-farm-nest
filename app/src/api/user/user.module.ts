import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { Token } from '../token/token.entity';
import { UserService } from './user.service';
import { RedditModule } from '../../shared/reddit/reddit.module';
import { RedditService } from '../../shared/reddit/reddit.service';
import { TokenModule } from '../token/token.module';
import { TokenService } from '../token/token.service';

@Module({
  imports: [TokenModule, RedditModule, TypeOrmModule.forFeature([User, Token])],
  controllers: [UserController],
  providers: [UserService, RedditService, TokenService],
  exports: [UserService],
})
export class UserModule {}
