import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';


@ValidatorConstraint({ async: true }) 
@Injectable()
export class ExistValidator implements ValidatorConstraintInterface {
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
        return args.property + ' ' + args.value + ' tidak ditemukan'
    }

}

export function IsExist(option: any, validationOption?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({ 
            name: 'IsExist', 
            target: object.constructor,
            propertyName: propertyName,
            constraints: option,
            options: validationOption, 
            validator: ExistValidator,
            async: true
        })
    }
}

