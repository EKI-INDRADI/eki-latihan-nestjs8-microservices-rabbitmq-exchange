import { ApiHideProperty, ApiProperty, OmitType } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator"
import { IsExistPostgresql } from "src/etc/validator/exist-postgresql-validator"
import { IsUniquePostgresql } from "src/etc/validator/unique-postgresql-validator"
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
    price_selling: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price_msrp: number

    @ApiProperty()
    @IsOptional() // jangan setting ke string
    image_filename: string

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

    @ApiHideProperty()
    @IsString()
    user_obj_string: string
}

export class CreateProductDto extends OmitType(ProductDto, ['id']) { }

export class CreateProductDtoAutoSync {

    @ApiProperty()
    @IsExistPostgresql([Product, 'id'])
    @IsString()
    id: number

    @ApiProperty()
    @IsUniquePostgresql([Product, 'barcode'])
    @IsString()
    @IsNotEmpty()
    barcode: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nama_produk: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    deskripsi_produk: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    harga_beli: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    harga_jual: number

    @ApiProperty()
    @IsOptional() // jangan setting ke string
    foto: string

    // @ApiProperty() 
    // @IsDate()
    // create_at: Date

    // @ApiProperty() 
    // @IsDate()
    // update_at: Date

    // @ApiHideProperty() // <<< ini berguna untuk exclude swagger,  gak perlu di input user @ApiProperty() (otomatis dari user login)
    // @IsObject()  //datanya harus object (karena relasi dari user)
    // user: UserDto // pake fieldnya mengikuti UserDto

    @ApiHideProperty()
    @IsString()
    user_obj_string: string

    // @ApiHideProperty()
    // @IsObject()
    // user_obj: string


}
