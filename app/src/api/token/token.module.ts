import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { TokenService } from './token.service';
import { RedditModule } from '../../shared/reddit/reddit.module';
import { RedditService } from '../../shared/reddit/reddit.service';

@Module({
  imports: [RedditModule, TypeOrmModule.forFeature([Token])],
  controllers: [],
  providers: [TokenService, RedditService],
  exports: [TokenService],
})
export class TokenModule {}
