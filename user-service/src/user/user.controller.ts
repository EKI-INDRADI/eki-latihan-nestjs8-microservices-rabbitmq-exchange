import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, RequestGetUserCustomDto_WithPage, ResponGetUserCustomDto_WithPage, UserIdDto, UserManualQueryDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { ToolsService } from '../tools/tools.service';

@ApiTags('User')
@Controller('user')

export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly toolsService: ToolsService

  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  // @ApiBearerAuth() INFO : user-service\src\main.ts
  @ApiSecurity('eki-custom-token')
  @UseGuards(JwtGuard)
  @Get()
  async findAll() {

    let res_json: any = {}
    let data = await this.userService.findAll();

    if (data) {
      res_json.statusCode = 1

      data.forEach(element => {
        element = this.toolsService.objectSortAlphabetical(element).after_sort
      })

      res_json.data = data
    } else {
      res_json.statusCode = 0
      res_json.message = "data not found"
    }

    return res_json

  }

  // @ApiBearerAuth() INFO : user-service\src\main.ts
  @ApiSecurity('eki-custom-token')
  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let res_json: any = {}
    let data = await this.userService.findOne(id)

    if (data) {
      res_json.statusCode = 1
      let dataSortObj = this.toolsService.objectSortAlphabetical(data)
      res_json.data = dataSortObj.after_sort
    } else {
      res_json.statusCode = 0
      res_json.message = "data not found"
    }

    // delete res_json.password // NOT WORK
    // res_json.password = undefined
    // res_json._id = undefined
    // res_json.__v = undefined
    // remove by projection
    return res_json
  }

  // @ApiBearerAuth() INFO : user-service\src\main.ts
  @ApiSecurity('eki-custom-token')
  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

    let res_json: any = {}
    let data = await this.userService.update(id, updateUserDto);

    if (data) {
      res_json.statusCode = 1
      res_json.message = data.message
    } else {
      res_json.statusCode = 0
      res_json.message = data.message //"data not found"
    }

    return res_json

  }

  // @ApiBearerAuth() INFO : user-service\src\main.ts
  @ApiSecurity('eki-custom-token')
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param() get_UserIdDto: UserIdDto) {
    return this.userService.remove(get_UserIdDto.id);
  }

  // @ApiBearerAuth() INFO : user-service\src\main.ts
  @ApiSecurity('eki-custom-token')
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
  @ApiSecurity('eki-custom-token')
  @UseGuards(JwtGuard)
  @Post('manual-get-custom')
  @ApiOkResponse({ type: ResponGetUserCustomDto_WithPage })
  findAll2(@Body() req_body: RequestGetUserCustomDto_WithPage) {
    return this.userService.findAll2(req_body);
  }

}
