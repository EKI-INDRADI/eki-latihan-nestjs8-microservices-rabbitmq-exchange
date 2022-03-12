import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getConnection, Not } from 'typeorm';

@ValidatorConstraint({ async: true }) 
@Injectable()
export class UniquePostgresqlValidator implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments) { 

        let find = {
            where: { [args.constraints[1]]: args.value }
        }

        if (args.object['id']){
            find.where['id'] = Not(args.object['id']) 
        }

        let check = await getConnection().getRepository(args.constraints[0]).findOne(find)

        if (check) return false
        return true
    }

    defaultMessage(args: ValidationArguments) {
        return args.property + ' ' + args.value + ' already exist'
    }

}



export function IsUniquePostgresql(option: any, validationOption?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsUniquePostgresql', 
            target: object.constructor,
            propertyName: propertyName,
            constraints: option,
            options: validationOption, 
            validator: UniquePostgresqlValidator, 
            async: true
        })
    }
}

