import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegUserDto {
  // @IsNotEmpty()
  public password: string;

  // @IsNotEmpty()
  public code: string;

  // @IsNotEmpty()
  public state: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  refreshToken: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
