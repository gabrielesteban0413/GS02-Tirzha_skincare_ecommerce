import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class GetProductsByTypeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  type: string = '';
}
