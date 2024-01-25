import { IsPhoneNumber } from 'class-validator';

export class PhoneNumberAvailabilityDto {
    @IsPhoneNumber()
    phone: string;
}


// In URL encoding:
// %2B is the encoded form of the + sign.
// So, when you send ?phone=%2B421454550089:
// It's correctly interpreted as ?phone=+421454550089.