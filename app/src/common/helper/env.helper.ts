import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  console.log('dest', dest);
  console.log('env', env);
  const fallback: string = resolve(`${dest}/.env`);
  const filename: string = env ? `.env.${env}.local` : '.env.development.local';
  let filePath: string = resolve(`${dest}/${filename}`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  return filePath;
}
