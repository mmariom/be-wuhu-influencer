import { IsString, Length } from 'class-validator';

export class CompanyRegNumberAvailabilityDto {
  @IsString()
  @Length(5, 20) // Example, adjust according to your requirements
  regNumber: string;
}
