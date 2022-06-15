import { IsNotEmpty, IsString } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

export class NewTokenDto {
  @IsNotEmpty()
  public scope: string;

  @Expose()
  public get accessToken() {
    return this.access_token;
  }

  @Expose()
  public get tokenType(): string {
    return this.token_type;
  }

  @Expose()
  public get refreshToken(): string {
    return this.refresh_token;
  }
  @Expose()
  public get expiresIn(): string {
    return this.expires_in;
  }

  @Exclude({ toPlainOnly: true })
  expires_in: string;
  @Exclude({ toPlainOnly: true })
  refresh_token: string;
  @Exclude({ toPlainOnly: true })
  token_type: string;
  @Exclude({ toPlainOnly: true })
  access_token: string;
}
