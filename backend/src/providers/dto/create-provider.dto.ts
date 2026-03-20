import { IsString, IsOptional } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
