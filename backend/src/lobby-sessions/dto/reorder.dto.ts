import { IsArray, IsNumber } from 'class-validator';

export class ReorderDto {
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];
}
