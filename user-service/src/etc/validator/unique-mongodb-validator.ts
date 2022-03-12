import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Connection } from 'mongoose';

@ValidatorConstraint({ async: true }) 
@Injectable()
export class UniqueMongodbValidator implements ValidatorConstraintInterface {
    constructor(
        @InjectConnection() private MongoDbConnection: Connection,
    ) { }

    async validate(value: any, args: ValidationArguments) {

        let findCondition = { [args.constraints[1]]: args.value }

        if (args.object['id']) {
            findCondition['id'] = {
                $ne: args.object['id']
            }
        }

        let check: any = null

        check = await this.MongoDbConnection.model(args.constraints[0]).findOne(findCondition)

        if (check) return false
        return true
    }

    defaultMessage(args: ValidationArguments) {
        return args.property + ' ' + args.value + ' already exists'
    }

}

export function IsUniqueMongodb(option: any, validationOption?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsUniqueMongodb',
            target: object.constructor,
            propertyName: propertyName,
            constraints: option,
            options: validationOption,
            validator: UniqueMongodbValidator,
            async: true
        })
    }
}


