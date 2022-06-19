import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedditService } from './reddit.service';

@Module({
  imports: [ConfigModule],
  providers: [RedditService, ConfigService],
  exports: [RedditService],
})
export class RedditModule {}
