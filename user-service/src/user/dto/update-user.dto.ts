import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist } from 'src/etc/validator/exist-validator';
import { User } from '../entities/user.entity';
import { CreateUserDto, GetUserListDto, UserDto } from './create-user.dto';

// export class UpdateUserDto extends PartialType(UserDto) {} 

export class UpdateUserDto extends PartialType(UserDto) {
    @ApiProperty({ required: true, default: '20220206-1644087226561' })
    @IsNotEmpty()
    @IsExist([User.name, 'id'])
    id?: string
} 

export class UpdateUserDtoAutoSync extends PartialType(UserDto) {
    @ApiProperty({ required: true, default: '20220206-1644087226561' })
    @IsNotEmpty()
    @IsExist([User.name, 'id'])
    id?: string

    @ApiHideProperty()
    @IsOptional()
    @IsDate()
    updated_at: Date
} 


