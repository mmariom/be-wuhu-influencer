
// import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

// @ValidatorConstraint({ async: false })
// export class IsCustomPhoneNumberConstraint implements ValidatorConstraintInterface {
//   validate(phone: string, args: ValidationArguments) {
//     // Example regex: Allows only digits, must start with 421 or 420 or..., and be 9 to 12 digits long
//     return phone.match(/^(421|420|48|43|49)[0-9]{6,9}$/) != null;
//   }

//   defaultMessage(args: ValidationArguments) {
//     return 'Phone number must be a valid phone number' ;
//   }
// }

// export function IsCustomPhoneNumber(validationOptions?: ValidationOptions) {
//   return function (object: Object, propertyName: string) {
//     registerDecorator({
//       name: 'isCustomPhoneNumber',
//       target: object.constructor,
//       propertyName: propertyName,
//       constraints: [],
//       options: validationOptions,
//       validator: IsCustomPhoneNumberConstraint,
//     });
//   };
// }


// src/common/decorators/is-phone-number.decorator.ts

import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

@ValidatorConstraint({ async: false })
export class IsPhoneNumberConstraint implements ValidatorConstraintInterface {
  validate(phone: string, args: ValidationArguments) {

    const countries: CountryCode[] = ['SK', 'CZ', 'PL', 'AT', 'HU'];

    return countries.some(country => {
      const phoneNumber = parsePhoneNumberFromString(phone, country);
      return phoneNumber ? phoneNumber.isValid() : false;
    });
  }

  defaultMessage(args: ValidationArguments) {
    return 'Phone number must be a valid number from Slovakia, Czech Republic, Poland, Austria, or Hungary';
  }
}

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsPhoneNumberConstraint,
    });
  };
}
