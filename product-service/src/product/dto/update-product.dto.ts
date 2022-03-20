import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { IsExistPostgresql } from 'src/etc/validator/exist-postgresql-validator';
import { IsUniquePostgresql } from 'src/etc/validator/unique-postgresql-validator';
import { UserDtoRelation } from 'src/user/dto/create-user.dto';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) { }

export class UpdateProductDtoAutoSync {
    @ApiProperty({ default: "20220315-1647335584856" })
    @IsExistPostgresql([Product, 'id'])
    @IsOptional()
    @IsString()
    id?: string

    @ApiProperty({
        default: String(
            new Date().getFullYear()
            + ("0" + (new Date().getMonth() + 1)).slice(-2)
            + ("0" + new Date().getDate()).slice(-2)
            + "-" + String(Date.now())
            // + ("0" + new Date().getMinutes()).slice(-2)
            // + ("0" + new Date().getSeconds()).slice(-2)
            // + ("0" + new Date().getMilliseconds()).slice(-3)
        )
        // , required: false
    })
    @IsUniquePostgresql([Product, 'barcode'])
    @IsString()
    @IsNotEmpty()
    barcode: string

    @ApiProperty({
        default: String(
            new Date().getFullYear()
            + ("0" + (new Date().getMonth() + 1)).slice(-2)
            + ("0" + new Date().getDate()).slice(-2)
            + "-" + String(Date.now())
            // + ("0" + new Date().getMinutes()).slice(-2)
            // + ("0" + new Date().getSeconds()).slice(-2)
            // + ("0" + new Date().getMilliseconds()).slice(-3)
        )
        // , required: false
    })
    @IsUniquePostgresql([Product, 'barcode'])
    @IsString()
    @IsNotEmpty()
    sku: string

    @ApiProperty({
        default: String(
            'NAME'
            + "-" + String(Date.now())
        )
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        default: String(
            'DESCRIPTION'
            + "-" + String(Date.now())
        )
    })
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({ default: 700 })
    @IsNumber()
    @IsNotEmpty()
    price_purchase: number

    @ApiProperty({ default: 1000 })
    @IsNumber()
    @IsNotEmpty()
    price_sale: number

    @ApiProperty({ default: 850 })
    @IsNumber()
    @IsNotEmpty()
    price_msrp: number

    @ApiProperty({ default: 800 })
    @IsNumber()
    @IsNotEmpty()
    price_net: number

    @ApiProperty({
        default: String(
            new Date().getFullYear()
            + ("0" + (new Date().getMonth() + 1)).slice(-2)
            + ("0" + new Date().getDate()).slice(-2)
            + "-" + String(Date.now())
            + ".png"
        )
    })
    @IsOptional() // jangan setting ke string
    image_filename_ext: string

    @ApiHideProperty()
    @IsOptional()
    @IsObject()
    user: UserDtoRelation

    @ApiHideProperty()
    @IsOptional()
    @IsDate()
    created_at: Date

    @ApiHideProperty()
    @IsOptional()
    @IsDate()
    updated_at: Date
}

