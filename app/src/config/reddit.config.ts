import { registerAs } from '@nestjs/config';

export default registerAs('reddit', () => ({
  REDDIT_AGENT: process.env.REDDIT_AGENT,
  REDDIT_CLIENT_ID: process.env.REDDIT_CLIENT_ID,
  REDDIT_CLIENT_SECRET: process.env.REDDIT_CLIENT_SECRET,
  REDDIT_REDIRECT_URI: process.env.REDDIT_REDIRECT_URI,
}));
