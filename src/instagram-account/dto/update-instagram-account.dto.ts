import { IsEnum, IsInt, IsNotEmpty, IsArray, ValidateNested,  IsString, Min, Max } from 'class-validator';
import { Type as TypeORMType } from 'class-transformer';
import { Gender } from '../entities/instagram-account.entity';

export class UpdateInstagramAccountDto {
  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear()) // Ensures the year is not in the future
  yearOfBirth: number;

  @IsArray()
  @IsInt({ each: true })
//   @Type(() => Number)
  interests: number[]; // Now expecting an array of interest IDs
}
