import { ApiHideProperty, ApiProperty, OmitType } from "@nestjs/swagger"
import { IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator"
import { PageMongodbResponseDto } from "src/etc/dto/page-mongodb-dto"
import { PagePostgresqlRequestDto } from "src/etc/dto/page-postgresql-dto"
import { IsExistPostgresql } from "src/etc/validator/exist-postgresql-validator"
import { IsUniquePostgresql } from "src/etc/validator/unique-postgresql-validator"
import { UserDtoRelation } from "src/user/dto/create-user.dto"
import { Product } from "../entities/product.entity"

export class ProductDto {
    @ApiProperty()
    @IsExistPostgresql([Product, 'id'])
    @IsString()
    id: string

    @ApiProperty()
    @IsUniquePostgresql([Product, 'barcode'])
    @IsString()
    @IsNotEmpty()
    barcode: string

    @ApiProperty()
    @IsUniquePostgresql([Product, 'barcode'])
    @IsString()
    @IsNotEmpty()
    sku: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price_purchase: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price_sale: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price_msrp: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price_net: number

    @ApiProperty()
    @IsOptional() // jangan setting ke string
    image_filename_ext: string

    // created_at: Date
    // updated_at: Date
    // user_obj_string: string // dari entities


    // @ApiProperty() 
    // @IsDate()
    // create_at: Date

    // @ApiProperty() 
    // @IsDate()
    // update_at: Date

    // @ApiHideProperty() // <<< ini berguna untuk exclude swagger,  gak perlu di input user @ApiProperty() (otomatis dari user login)
    // @IsObject()  //datanya harus object (karena relasi dari user)
    // user: UserDto // pake fieldnya mengikuti UserDto

    // @ApiHideProperty()
    // @IsString()
    // user_obj_string: string

    @ApiHideProperty()
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

export class CreateProductDto extends OmitType(ProductDto, ['id']) { }

export class CreateProductDtoAutoSync {
    @ApiHideProperty()
    @IsUniquePostgresql([Product, 'id'])
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

export class GetProductListDto {
    @ApiProperty({ default: '20220313-1647171605557' })
    @IsString()
    @IsOptional()
    id: string

    @ApiProperty({ default: '20220313-1647171578167' })
    @IsString()
    @IsOptional()
    barcode: string

    @ApiProperty({ default: '20220313-1647171578167' })
    @IsString()
    @IsOptional()
    sku: string

    @ApiProperty({ default: 'NAME-1647171578167' })
    @IsString()
    @IsOptional()
    name: string

    @ApiProperty({ default: 'DESCRIPTION-1647171578167' })
    @IsString()
    @IsOptional()
    description: string

    @ApiProperty({ default: 700 })
    @IsNumber()
    @IsOptional()
    price_purchase: number

    @ApiProperty({ default: 1000 })
    @IsNumber()
    @IsOptional()
    price_sale: number

    @ApiProperty({ default: 850 })
    @IsNumber()
    @IsOptional()
    price_msrp: number

    @ApiProperty({ default: 800 })
    @IsNumber()
    @IsOptional()
    price_net: number

    @ApiProperty({ default: '20220313-1647171578167.png' })
    @IsOptional()
    image_filename_ext: string

    @ApiProperty({ default: '2022-03-13T11:40:05.557Z' })
    @IsOptional()
    @IsDate()
    created_at: Date

    @ApiProperty({ default: '2022-03-13T11:40:05.557Z' })
    @IsOptional()
    @IsDate()
    updated_at: Date
}

export class GetProductListDto_WithPage extends PagePostgresqlRequestDto {
    @ApiProperty({ default: '20220313-1647171605557' })
    @IsString()
    @IsOptional()
    id: string

    @ApiProperty({ default: '20220313-1647171578167' })
    @IsString()
    @IsOptional()
    barcode: string

    @ApiProperty({ default: '20220313-1647171578167' })
    @IsString()
    @IsOptional()
    sku: string

    @ApiProperty({ default: 'NAME-1647171578167' })
    @IsString()
    @IsOptional()
    name: string

    @ApiProperty({ default: 'DESCRIPTION-1647171578167' })
    @IsString()
    @IsOptional()
    description: string

    @ApiProperty({ default: 700 })
    @IsNumber()
    @IsOptional()
    price_purchase: number

    @ApiProperty({ default: 1000 })
    @IsNumber()
    @IsOptional()
    price_sale: number

    @ApiProperty({ default: 850 })
    @IsNumber()
    @IsOptional()
    price_msrp: number

    @ApiProperty({ default: 800 })
    @IsNumber()
    @IsOptional()
    price_net: number

    @ApiProperty({ default: '20220313-1647171578167.png' })
    @IsOptional()
    image_filename_ext: string

    @ApiProperty({ default: '2022-03-13T11:40:05.557Z' })
    @IsOptional()
    @IsDate()
    created_at: Date

    @ApiProperty({ default: '2022-03-13T11:40:05.557Z' })
    @IsOptional()
    @IsDate()
    updated_at: Date
}

export class ProductIdDtoAutoSync {
    @ApiProperty({ required: true, default: '20220315-1647335444685' })
    @IsNotEmpty()
    @IsExistPostgresql([Product, 'id'])
    id?: string
}