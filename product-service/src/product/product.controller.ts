import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, CreateProductDtoAutoSync, GetProductListDto, GetProductListDto_WithPage, ProductIdDtoAutoSync } from './dto/create-product.dto';
import { UpdateProductDto, UpdateProductDtoAutoSync } from './dto/update-product.dto';
import { ToolsService } from 'src/etc/service/tools/tools.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { InjectUser } from 'src/etc/decorator/inject-user.decorator';


@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly toolsService: ToolsService
  ) { }

  @ApiSecurity('eki-custom-auth-header')
  @UseGuards(JwtGuard)
  @Post('/create-product')
  async create(@InjectUser() @Body() createProductDto: CreateProductDtoAutoSync) {
    return this.productService.create(createProductDto);
  }

  @ApiSecurity('eki-custom-auth-header')
  @UseGuards(JwtGuard)
  @Post('/get-user-list')
  async findAll(@Body() getProductListDto: GetProductListDto) {
    let res_json: any = await this.productService.findAll(getProductListDto);
    return res_json
  }

  @ApiSecurity('eki-custom-auth-header')
  @UseGuards(JwtGuard)
  @Post('/get-user-list-with-page')
  async findAll_WithPage(@Body() getProductListDto_WithPage: GetProductListDto_WithPage) {
    let res_json: any = await this.productService.findAll_WithPage(getProductListDto_WithPage);
    return res_json
  }

  @ApiSecurity('eki-custom-auth-header')
  @UseGuards(JwtGuard)
  @Post('/update-product')
  async update(@InjectUser() @Body() updateProductDto: UpdateProductDtoAutoSync) {
    return this.productService.update(updateProductDto);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiSecurity('eki-custom-auth-header')
  @UseGuards(JwtGuard)
  @Post('/delete-product')
  async remove(@Body() productIdDto: ProductIdDtoAutoSync) {
    let res_json = await this.productService.remove(productIdDto);
    return res_json
  }


}
