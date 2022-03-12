import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Connection } from 'mongoose';

@ValidatorConstraint({ async: true }) 
@Injectable()
export class ExistMongodbValidator implements ValidatorConstraintInterface {
    constructor(
        @InjectConnection() private MongoDbConnection: Connection,
    ) { }

    async validate(value: any, args: ValidationArguments) {
        let findCondition = { [args.constraints[1]]: args.value }
        let check: any = null
        check = await this.MongoDbConnection.model(args.constraints[0]).findOne(findCondition)

        
        if (check) return true
        return false
    }

    defaultMessage(args: ValidationArguments) {
        return args.property + ' ' + args.value + ' not found'
    }

}

export function IsExistMongodb(option: any, validationOption?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({ 
            name: 'IsExistMongodb', 
            target: object.constructor,
            propertyName: propertyName,
            constraints: option,
            options: validationOption, 
            validator: ExistMongodbValidator,
            async: true
        })
    }
}
