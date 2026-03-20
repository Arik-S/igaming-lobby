import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateGameDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsNumber()
  providerId: number;

  @IsNumber()
  categoryId: number;
}
