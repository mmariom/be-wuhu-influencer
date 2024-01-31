
// import { IsEmail, IsNumber, IsNumberString, IsString } from 'class-validator';

// // create-influencer.dto.ts
// export class CreateInfluencerDto {
//   email: string;
//   password: string;
//   phoneNumber: string;
//   firstName: string;
//   lastName: string;
//   accountIsActive: boolean;
//   accountIdVerified: boolean;
//   isBusinessUser: boolean;
//   address: {
//     street: string;
//     city: string;
//     postalCode: string;
//     country: string;
//   };
//   company?: {
//     companyName: string;
//     street: string;
//     city: string;
//     postalCode: string;
//     country: string;
//     companyRegNumber: string;
//   };
// }



import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, Matches, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsBusinessUserHasCompany } from 'src/common/validators/business-user-company.validator';

class AddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}

class CompanyDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  companyRegNumber: string;
}

export class RegisterInfluencerDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  password: string;

  // Fields for steps 2, 3, and the optional business user step
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsNotEmpty()
  isBusinessUser: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => CompanyDto)
  company?: CompanyDto;

  @IsBusinessUserHasCompany({ message: 'Business users must provide company details.' })
  businessUserValidation: boolean;
}
