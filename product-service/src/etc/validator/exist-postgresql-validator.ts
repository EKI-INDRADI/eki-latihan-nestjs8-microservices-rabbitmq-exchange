import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getConnection } from 'typeorm';

@ValidatorConstraint({async:true}) 
@Injectable()
export class ExistPostgresqlValidator implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments) { 
        let find = { [args.constraints[1]]: args.value }
        let check = await getConnection().getRepository(args.constraints[0]).findOne(find)

        if (check) return true 
        return false
    }

    defaultMessage(args: ValidationArguments) {
        return args.property + ' ' + args.value + ' not found'
    }

}

export function IsExistPostgresql(option:any,validationOption?:ValidationOptions){
    return function (object:any, propertyName:string) {
        registerDecorator({ 
            name : 'IsExistPostgresql', 
            target : object.constructor,
            propertyName : propertyName,
            constraints : option,
            options : validationOption, 
            validator : ExistPostgresqlValidator, 
            async : true
        })
    }
}

