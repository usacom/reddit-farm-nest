import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import PostgresConfig from './config/postgres.config';
import JWTConfig from './config/jwt.config';
import RedditConfig from './config/reddit.config';

import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [PostgresConfig, JWTConfig, RedditConfig],
      isGlobal: true,
    }),
    ApiModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
