import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Request,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';
import { PostParamsLoadDto } from '../post/post.dto';
import { RedditService } from '../../shared/reddit/reddit.service';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('/post')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private userService: UserService) {}

  @Inject(PostService)
  private postService: PostService;

  @Get('/last')
  async getUserPosts(@Request() req, @Query() params: PostParamsLoadDto) {
    const user: User = await this.userService.getUser(req.user.userId)
    return this.postService.getUserPosts(user, params);
  }

  @Get('/sub/:subreddit')
  async getPosts(@Request() req, @Param('subreddit') sub: string, @Query() params: PostParamsLoadDto) {
    const user: User = await this.userService.getUser(req.user.userId)
    return this.postService.getPosts(sub, user, params);
  }
  
  @Get('/info/:subreddit')
  async getSubreddit(@Request() req, @Param('subreddit') sub: string) {
    const user: User = await this.userService.getUser(req.user.userId)
    return this.postService.getSubreddit(sub, user);
  }
}
