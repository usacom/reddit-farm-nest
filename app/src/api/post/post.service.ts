import { Injectable, Inject } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { RedditService } from '../../shared/reddit/reddit.service';
import { TokenService } from '../token/token.service';

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

  public async getUserPosts(
    user: User,
    params: PostParamsLoadDto = new PostParamsLoadDto(),
  ): Promise<object> {
    const token = user.tokens.pop();

    const r = this.redditService.createRedditService(token.refreshToken);

    let posts = null;
    console.log('params', params);
    await r
      .getNew(`u_${user.username}`, { limit: 100, ...params })
      .then((data) => {
        posts = data;
      });

    return posts;
  }

  public async getPosts(
    subreddit: string,
    user: User,
    params: PostParamsLoadDto = new PostParamsLoadDto(),
  ): Promise<object> {
    const token = user.tokens.pop();

    const r = this.redditService.createRedditService(token.refreshToken);
    console.log('params', params);
    let posts = null;
    await r.getNew(subreddit, { limit: 100, ...params }).then((data) => {
      posts = data;
    });
    return posts;
  }

  public async getSubreddit(subreddit: string, user: User): Promise<object> {
    const token = user.tokens.pop();

    const r = this.redditService.createRedditService(token.refreshToken);
    let flairs = null;
    let rules = null;
    const SubEnd = r.getSubreddit(subreddit);
    await SubEnd.getUserFlairTemplates().then((data) => {
      flairs = data;
    });
    await SubEnd.getRules().then((data) => {
      rules = data;
    });
    return {
      flairs,
      rules,
    };
  }
}
