import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [UserModule, AuthModule, PostModule],
})
export class ApiModule {}
