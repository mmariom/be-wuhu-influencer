import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { RegisterInfluencerDto } from 'src/influencer/dto/register-influencer.dto';

@ValidatorConstraint({ async: true })
export class IsBusinessUserHasCompanyConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const object = args.object as RegisterInfluencerDto;
        // Ensure isBusinessUser is interpreted as a boolean
        const isBusinessUser = object.isBusinessUser === true;

        if (isBusinessUser) {
            return object.company != null;
        }
        return true; // If not a business user, validation passes
    }

    defaultMessage(args: ValidationArguments) {
        return 'Business users must provide company details.';
    }
}

export function IsBusinessUserHasCompany(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsBusinessUserHasCompanyConstraint,
        });
    };
}
