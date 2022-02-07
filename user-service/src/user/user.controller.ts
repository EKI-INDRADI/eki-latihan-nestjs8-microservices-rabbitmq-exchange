import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserDtoAutoSync, GetUserListDto, GetUserListDto_WithPage, RequestGetUserCustomDto_WithPage, ResponGetUserCustomDto_WithPage, UserIdDto, UserManualQueryDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserDtoAutoSync } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { ToolsService } from '../etc/service/tools/tools.service';




@ApiTags('User')
@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly toolsService: ToolsService
  ) {

  }

  @Post('/user-signup')
  async create(@Body() createUserDto: CreateUserDtoAutoSync) {
    // async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  // @ApiBearerAuth() INFO : user-service\src\main.ts
  @ApiSecurity('eki-custom-auth-header')
  @UseGuards(JwtGuard)
  @Post('/get-user-list')
  async findAll(@Body() getUserListDto: GetUserListDto) {
    let res_json: any = await this.userService.findAll(getUserListDto);
    return res_json
  }

  @ApiSecurity('eki-custom-auth-header')
  @UseGuards(JwtGuard)
  @Post('/get-user-list-pages')
  // @ApiOkResponse({ type: ResponGetUserCustomDto_WithPage })
  async findAllPages(@Body() getUserListDto_WithPage: GetUserListDto_WithPage) {
    let res_json: any = await this.userService.findAllPages(getUserListDto_WithPage);
    return res_json
  }

  // @ApiBearerAuth() INFO : user-service\src\main.ts
  @ApiSecurity('eki-custom-auth-header')
  @UseGuards(JwtGuard)
  @Post('/get-user')
  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  async findOne(@Body() userIdDto: UserIdDto) {
    let res_json: any = await this.userService.findOne(userIdDto)
    return res_json
  }

  // @ApiBearerAuth() INFO : user-service\src\main.ts
  @ApiSecurity('eki-custom-auth-header')
  @UseGuards(JwtGuard)
  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   let data = await this.userService.update(id, updateUserDto);
  @Post('/update-user')
  async update(@Body() updateUserDto: UpdateUserDtoAutoSync) {
    // async update(@Body() updateUserDto: UpdateUserDto) {
    let res_json = await this.userService.update(updateUserDto);
    return res_json
  }

  // @ApiBearerAuth() INFO : user-service\src\main.ts
  @ApiSecurity('eki-custom-auth-header')
  @UseGuards(JwtGuard)
  @Post('/delete-user')
  async remove(@Body() userIdDto: UserIdDto) {
    let res_json = await this.userService.remove(userIdDto);
    return res_json
  }

  // @ApiBearerAuth() INFO : user-service\src\main.ts
  @ApiSecurity('eki-custom-auth-header')
  @UseGuards(JwtGuard)
  @Post('manual-query')
  async manualQuery(@Body() req_body: UserManualQueryDto) {  //test
    // {
    //   "variant": "findOne",
    //   "condition": { "username" : "stringst"}
    // }
    let res_json = {}
    res_json = await this.userService.manualQuery(req_body.variant, req_body.condition)
    return res_json
  }

  // @ApiBearerAuth() INFO : user-service\src\main.ts
  @ApiSecurity('eki-custom-auth-header')
  @UseGuards(JwtGuard)
  @Post('manual-get-custom')
  @ApiOkResponse({ type: ResponGetUserCustomDto_WithPage })
  findAll2(@Body() req_body: RequestGetUserCustomDto_WithPage) {
    return this.userService.findAll2(req_body);
  }

}
