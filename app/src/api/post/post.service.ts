import * as bcrypt from 'bcrypt';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { RedditService } from '../../shared/reddit/reddit.service';
import { TokenService } from '../token/token.service';
import { Token } from '../token/token.entity';
import { User } from '../user/user.entity';
import { PostParamsLoadDto } from './post.dto';

@Injectable()
export class PostService {
//   @InjectRepository(User)
//   private readonly repository: Repository<User>;

  @Inject(ConfigService)
  private readonly config: ConfigService;

  @Inject(RedditService)
  private readonly redditService: RedditService;

  @Inject(TokenService)
  private readonly tokenService: TokenService;

  public async getUserPosts(user: User, params: PostParamsLoadDto = new PostParamsLoadDto): Promise<object> {
    const token = user.tokens.pop()
    
    const r = this.redditService.createRedditService(token.refreshToken);
  

    let posts = null;
    console.log('params', params)
    await r.getNew(`u_${user.username}`, { limit: 100, ...params }).then((data)=>{
      posts = data;
    })

    return posts;
  }

  public async getPosts(subreddit: string, user: User, params: PostParamsLoadDto = new PostParamsLoadDto): Promise<object> {
    const token = user.tokens.pop()
    
    const r = this.redditService.createRedditService(token.refreshToken);
    console.log('params', params)
    let posts = null;
    await r.getNew(subreddit, { limit: 100, ...params}).then((data)=>{
      posts = data;
    })
    return posts;
  }

  public async getSubreddit(subreddit: string, user: User): Promise<object> {
    const token = user.tokens.pop()
    
    const r = this.redditService.createRedditService(token.refreshToken);
    let posts = null;
    await r.getSubreddit(subreddit).then((data)=>{
      posts = data;
    })
    return posts;
    // return await r.getSubreddit(subreddit);
  }

}
