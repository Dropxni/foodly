import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  price!: number;

  @IsString()
  @IsOptional()
  image?: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  category!: number;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isAvailable!: boolean;
}
