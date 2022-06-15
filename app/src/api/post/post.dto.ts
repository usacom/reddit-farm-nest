import { IsOptional, IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Expose, Exclude, Transform } from 'class-transformer';

export class PostParamsLoadDto {
  @IsOptional()
  @IsString()
  after: string;

  @IsOptional()
  @IsString()
  before: string;

  @IsOptional()
  @IsString()
  show: string;

  @IsOptional()
	@Transform(({ value })=> Number.parseInt(value))
  limit: number;

  @IsOptional()
	@Transform(({ value })=> Number.parseInt(value))
  count: number;
}
  