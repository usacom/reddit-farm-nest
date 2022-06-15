import * as snoowrap from 'snoowrap';
import * as qs from 'querystring';
import * as RequestPromise from 'request-promise';
import * as Crypto from 'crypto';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NewTokenDto } from './reddit.dto';
@Injectable()
export class RedditService {
  @Inject(ConfigService)
  private readonly config: ConfigService;
  private readonly baseUrl: string = 'https://www.reddit.com/api/v1/';

  public getInfoAboutMySelf(r: snoowrap) {
    return r.getMe();
  }

  public createRedditService(refreshToken: string): snoowrap {
    console.log('refreshToken', refreshToken);
    const r = new snoowrap({
      userAgent: this.config.get<string>('REDDIT_AGENT'),
      clientId: this.config.get<string>('REDDIT_CLIENT_ID'),
      clientSecret: this.config.get<string>('REDDIT_CLIENT_SECRET'),
      refreshToken: refreshToken,
    });
    return r;
  }

  public async getRefreshToken(code): Promise<NewTokenDto> {
    const options = {
      method: 'POST',
      uri: this.baseUrl + 'access_token',
      auth: {
        user: this.config.get<string>('REDDIT_CLIENT_ID'),
        pass: this.config.get<string>('REDDIT_CLIENT_SECRET'),
      },
      form: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.config.get<string>('REDDIT_REDIRECT_URI'),
      },
      json: true, // Automatically stringifies the body to JSON
    };
    const result = await RequestPromise(options);
    const data: NewTokenDto = new NewTokenDto();
    await Object.entries(result).map((item) => {
      data[item[0]] = item[1];
    });
    return data;
  }

  public getAuthUrl() {
    const state = Crypto.randomBytes(16).toString('base64');
    return `${this.baseUrl}authorize?${qs.stringify({
      client_id: this.config.get<string>('REDDIT_CLIENT_ID'),
      response_type: 'code',
      state,
      redirect_uri: this.config.get<string>('REDDIT_REDIRECT_URI'),
      duration: 'permanent',
      scope: [
        'account',
        'creddits',
        'edit',
        'flair',
        'history',
        'identity',
        'livemanage',
        'modconfig',
        'modcontributors',
        'modflair',
        'modlog',
        'modmail',
        'modnote',
        'modothers',
        'modposts',
        'modself',
        'modtraffic',
        'modwiki',
        'mysubreddits',
        'privatemessages',
        'read',
        'report',
        'save',
        'structuredstyles',
        'submit',
        'subscribe',
        'vote',
        'wikiedit',
        'wikiread',
      ].join(' '),
    })}`;
    // return authUrl;
  }
}
