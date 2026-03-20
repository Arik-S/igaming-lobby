import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateLobbySessionDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsArray()
  @IsOptional()
  gameIds?: number[];
}
