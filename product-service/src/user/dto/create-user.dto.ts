import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { User } from "../entities/user.entity"
import { ApiHideProperty, OmitType, PickType } from "@nestjs/swagger"
import { ApiProperty } from "@nestjs/swagger"
import { PageMongodbRequestDto, PageMongodbResponseDto } from "src/etc/dto/page-mongodb-dto"
import { IsExistMongodb } from "src/etc/validator/exist-mongodb-validator"
import { IsUniqueMongodb } from "src/etc/validator/unique-mongodb-validator"

export class UserDto {
    @ApiProperty()
    @IsOptional()
    @IsExistMongodb([User.name, 'id'])
    id?: string

    @ApiProperty({ required: true, default: 'eki testing' })
    @IsString()
    @MaxLength(64)
    @MinLength(8)
    @IsNotEmpty()
    name: string

    @ApiProperty({ default: 'ekitesting@mail.com' })
    @IsEmail()
    @IsUniqueMongodb([User.name, 'email'])
    @MaxLength(32)
    @MinLength(6)
    @IsNotEmpty()
    email: string

    @ApiProperty({ default: 'ekitesting' })
    @IsString()
    @MaxLength(32)
    @MinLength(8)
    @IsNotEmpty()
    @IsUniqueMongodb([User.name, 'username']) 
    username: string

    @ApiProperty({ default: 'masuk123' })
    @IsString()
    @MaxLength(32)
    @MinLength(8)
    @IsNotEmpty()
    password: string

}

// export class CreateUserDto extends OmitType(UserDto, ['id']) { }

export class CreateUserDtoAutoSync {
    @ApiHideProperty()
    @IsOptional()
    @IsExistMongodb([User.name, 'id'])
    id?: string

    @ApiProperty({ required: true, default: 'eki testing' })
    @IsString()
    @MaxLength(64)
    @MinLength(8)
    @IsNotEmpty()
    name: string

    @ApiProperty({ default: 'ekitesting@mail.com' })
    @IsEmail()
    @IsUniqueMongodb([User.name, 'email'])
    @MaxLength(32)
    @MinLength(6)
    @IsNotEmpty()
    email: string

    @ApiProperty({ default: 'ekitesting' })
    @IsString()
    @MaxLength(32)
    @MinLength(8)
    @IsNotEmpty()
    @IsUniqueMongodb([User.name, 'username']) 
    username: string

    @ApiProperty({ default: 'masuk123' })
    @IsString()
    @MaxLength(32)
    @MinLength(8)
    @IsNotEmpty()
    password: string

    @ApiHideProperty()
    @IsOptional()
    @IsDate()
    created_at: Date

    @ApiHideProperty()
    @IsOptional()
    @IsDate()
    updated_at: Date
}

export class GetUserListDto {

    @ApiProperty({ required: true, default: '20220206-1644087226561' })
    @IsOptional()
    id?: string

    @ApiProperty({ required: true, default: 'eki testing' })
    @IsString()
    @MaxLength(64)
    @MinLength(8)
    @IsOptional()
    name?: string

    @ApiProperty({ default: 'ekitesting@mail.com' })
    @IsEmail()
    @MaxLength(32)
    @MinLength(6)
    @IsOptional()
    email?: string

    @ApiProperty({ default: 'ekitesting' })
    @IsString()
    @MaxLength(32)
    @MinLength(8)
    @IsOptional()
    username?: string
}

export class GetUserListDto_WithPage extends PageMongodbRequestDto {

    @ApiProperty({ required: true, default: '20220206-1644087226561' })
    @IsOptional()
    id?: string

    @ApiProperty({ required: true, default: 'eki testing' })
    @IsString()
    // @MaxLength(64)
    // @MinLength(8)
    @IsOptional()
    name?: string

    @ApiProperty({ default: 'ekitesting@mail.com' })
    @IsEmail()
    // @MaxLength(32)
    // @MinLength(6)
    @IsOptional()
    email?: string

    @ApiProperty({ default: 'ekitesting' })
    @IsString()
    // @MaxLength(32)
    // @MinLength(8)
    @IsOptional()
    username?: string

    @ApiHideProperty()
    @IsDate()
    @IsOptional()
    created_at: string

    @ApiHideProperty()
    @IsDate()
    @IsOptional()
    updated_at: string

}


// export class UserIdDto extends PickType(UserDto, ['id']) { }

export class UserIdDto {
    @ApiProperty({ required: true, default: '20220206-1644134218196' })
    @IsNotEmpty()
    // @IsExist([User.name, 'id'])
    id?: string
}


//===================== SEMENTARA NOT USED =====================

export class UserManualQueryDto {
    @ApiProperty({ required: true, default: 'find/findOne' })
    @IsOptional()
    variant?: string

    @ApiProperty({
        required: true, default: {
            $regex: {
                name: 'eki', $options: 'i'
            },
            created_at: { $gte: '2021-10-31T17:00:00.000Z', $lte: '2022-11-30T16:59:59.999Z' }
        }
    })
    @IsOptional()
    condition?: any
}

export class RequestGetUserCustomDto_WithPage extends PageMongodbRequestDto {

    @ApiProperty({ required: true, default: '20220206-1644087226561' })
    @IsOptional()
    id?: string

    @ApiProperty({ required: true, default: 'eki testing' })
    @IsString()
    // @MaxLength(64)
    // @MinLength(8)
    @IsOptional()
    name?: string

    @ApiProperty({ default: 'ekitesting@mail.com' })
    @IsEmail()
    // @MaxLength(32)
    // @MinLength(6)
    @IsOptional()
    email?: string

    @ApiProperty({ default: 'ekitesting' })
    @IsString()
    // @MaxLength(32)
    // @MinLength(8)
    @IsOptional()
    username?: string

    @ApiHideProperty()
    @IsDate()
    @IsOptional()
    created_at: string

    @ApiHideProperty()
    @IsDate()
    @IsOptional()
    updated_at: string
}

export class ResponGetUserCustomDto_WithPage extends PageMongodbResponseDto {
    @ApiProperty({ type: [UserDto] })
    data: UserDto[]
}

export class UserDtoRelation {
    @ApiProperty()
    @IsOptional()
    @IsExistMongodb([User.name, 'id'])
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
    @IsExistMongodb([User.name, 'email'])
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
    @IsExistMongodb([User.name, 'username'])
    username: string

    // @ApiProperty()
    // @IsString()
    // @MaxLength(32)
    // @MinLength(8)
    // @IsNotEmpty()
    // password: string 

    @ApiProperty()
    @IsDate()
    created_at: Date

    @ApiProperty()
    @IsDate()
    updated_at: Date
}


//===================== /SEMENTARA NOT USED =====================