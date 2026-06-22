import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  price!: number;

  @IsString()
  @IsNotEmpty()
  image!: string;

  @IsNumber()
  @IsNotEmpty()
  category!: number;

  @IsBoolean()
  isAvailable!: boolean;
}
