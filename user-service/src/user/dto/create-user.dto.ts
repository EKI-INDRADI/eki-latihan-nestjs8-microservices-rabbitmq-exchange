import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { User } from "../entities/user.entity"
import { IsUnique } from "src/etc/validator/unique-validator"
import { IsExist } from "src/etc/validator/exist-validator"
import { ApiHideProperty, OmitType, PickType } from "@nestjs/swagger"
import { ApiProperty } from "@nestjs/swagger"
import { PageRequestDto, PageResponseDto } from "src/etc/dto/page-dto"
export class UserDto {
    @ApiProperty()
    @IsOptional()
    @IsExist([User.name, 'id'])
    id?: string

    @ApiProperty({ required: true, default: 'eki testing' })
    @IsString()
    @MaxLength(64)
    @MinLength(8)
    @IsNotEmpty()
    name: string

    @ApiProperty({ default: 'ekitesting@mail.com' })
    @IsEmail()
    @IsUnique([User.name, 'email'])
    @MaxLength(32)
    @MinLength(6)
    @IsNotEmpty()
    email: string

    @ApiProperty({ default: 'ekitesting' })
    @IsString()
    @MaxLength(32)
    @MinLength(8)
    @IsNotEmpty()
    @IsUnique([User.name, 'username']) // sama aja @IsUnique(['User', 'username'])
    username: string

    @ApiProperty({ default: 'masuk123' })
    @IsString()
    @MaxLength(32)
    @MinLength(8)
    @IsNotEmpty()
    password: string

}

export class CreateUserDto extends OmitType(UserDto, ['id']) { }

export class UserIdDto extends PickType(UserDto, ['id']) { }

export class UserManualQueryDto {
    @ApiProperty()
    @IsOptional()
    variant?: string

    @ApiProperty()
    @IsOptional()
    condition?: any
}

export class RequestGetUserCustomDto_WithPage extends PageRequestDto {
    @ApiProperty({
        description: 'optional - id autogenerate, hanya untuk pencarian',
        default: 202112295441296
    })
    @IsNumber()
    @IsOptional()
    id: string

    @ApiProperty({
        description: 'optional - hanya untuk pencarian',
        default: '' //https://docs.nestjs.com/openapi/types-and-parameters
    })
    @IsString()
    @IsOptional()
    name: string

    @ApiProperty({
        description: 'optional - hanya untuk pencarian',
        default: ''
    })
    @IsString()
    @IsOptional()
    email: string

    @ApiProperty({
        description: 'optional - hanya untuk pencarian',
        default: 'ing'
    })
    @IsString()
    @IsOptional()
    username: string

    @ApiHideProperty()
    @IsDate()
    @IsOptional()
    created_at: string

    @ApiHideProperty()
    @IsDate()
    @IsOptional()
    updated_at: string

}

export class ResponGetUserCustomDto_WithPage extends PageResponseDto {
    @ApiProperty({ type: [UserDto] })
    data: UserDto[]

}


export class UserDtoRelation {
    @ApiProperty()
    @IsOptional()
    @IsExist([User.name, 'id'])
    id?: number

    @ApiProperty()
    @IsString()
    @MaxLength(64)
    @MinLength(8)
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsEmail()
    // @IsUnique([User.name, 'email'])
    @IsExist([User.name, 'email'])
    @MaxLength(32)
    @MinLength(6)
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsString()
    @MaxLength(32)
    @MinLength(8)
    @IsNotEmpty()
    // @IsUnique([User.name, 'username']) 
    @IsExist([User.name, 'username']) 
    username: string

    // @ApiProperty()
    // @IsString()
    // @MaxLength(32)
    // @MinLength(8)
    // @IsNotEmpty()
    // password: string 

    @ApiProperty()
    @IsDate()
    created_at : Date

    @ApiProperty()
    @IsDate()
    updated_at : Date
}