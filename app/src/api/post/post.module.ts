import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { RedditModule } from '../../shared/reddit/reddit.module';
import { RedditService } from '../../shared/reddit/reddit.service';

import { Token } from '../token/token.entity';
import { TokenModule } from '../token/token.module';
import { TokenService } from '../token/token.service';

import { PostService } from './post.service';

@Module({
  imports: [TokenModule, RedditModule, TypeOrmModule.forFeature([User, Token])],
  controllers: [PostController],
  providers: [UserService, RedditService, TokenService, PostService],
  exports: [PostService],
})
export class PostModule {}
