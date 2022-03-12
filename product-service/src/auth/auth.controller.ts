import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiHeaders, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ToolsService } from 'src/etc/service/tools/tools.service';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly toolsService: ToolsService
  ) {

  }

  // @Get()
  @Post('/check-user-sign-in')
  // @ApiBearerAuth() // terlalu simple

  //================== INI MEMUNCULKAN TEXTBOX UNTUK ISI HEADER 'eki-custom-auth-header'
  // @ApiHeader({ //   reference : // https://docs.nestjs.com/openapi/operations
  //   name: 'eki-custom-auth-header',
  //   description: 'Eki Custom header',
  // })
  // NOTE : masih kurang keren
  //================== /INI MEMUNCULKAN TEXTBOX UNTUK ISI HEADER 'eki-custom-auth-header'

  // @ApiBearerAuth() INFO : user-service\src\main.ts
  @ApiSecurity('eki-custom-auth-header')
  @UseGuards(JwtGuard)
  checkUserController(@Request() req) {

    let res_json: any = {}

    req.user = this.toolsService.objectSortAlphabetical(req.user).after_sort
    if (req.user && req.user.payload_login) {
      req.user.payload_login = this.toolsService.objectSortAlphabetical(req.user.payload_login).after_sort
      req.user.payload_login._id = undefined
      req.user.payload_login.__v = undefined
    }


    if (req.user) {
      res_json.statusCode = 200
      res_json.message = "success, check sign"
      res_json.data = req.user
    } else {
      res_json.statusCode = 400
      res_json.message = "error, check sign"
    }

    res_json = this.toolsService.objectSortAlphabetical(res_json).after_sort

    return res_json
  }

  @Post('/user-sign-in')
  async loginController(@Body() authDto: AuthDto) {

    let res_json: any = {}
    let user = await this.authService.checkUser(authDto.username, authDto.password)
    let generateToken: any = await this.authService.generateToken({  //payload
      id: user.id,
      user_payload: user
    })

    let created_at = new Date().toISOString()
    generateToken.created_at = created_at

    let JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

    let expired_at = new Date(created_at).setHours(new Date(created_at).getHours() + 12)

    if (String(JWT_EXPIRES_IN).includes("h") == true || String(JWT_EXPIRES_IN).includes("H") == true) {
      let JWT_EXPIRES_IN_REPLACE = String(JWT_EXPIRES_IN).replace("h", "").replace("H", "")
      let JWT_EXPIRES_IN_NUMBER = Number(JWT_EXPIRES_IN_REPLACE)
      expired_at = new Date(created_at).setHours(new Date(created_at).getHours() + JWT_EXPIRES_IN_NUMBER)
    }

    if (String(JWT_EXPIRES_IN).includes("m") == true || String(JWT_EXPIRES_IN).includes("M") == true) {
      let JWT_EXPIRES_IN_REPLACE = String(JWT_EXPIRES_IN).replace("m", "").replace("M", "")
      let JWT_EXPIRES_IN_NUMBER = Number(JWT_EXPIRES_IN_REPLACE)
      expired_at = new Date(created_at).setMinutes(new Date(created_at).getMinutes() + JWT_EXPIRES_IN_NUMBER)
    }

    if (String(JWT_EXPIRES_IN).includes("d") == true || String(JWT_EXPIRES_IN).includes("D") == true) {
      let JWT_EXPIRES_IN_REPLACE = String(JWT_EXPIRES_IN).replace("d", "").replace("D", "")
      let JWT_EXPIRES_IN_NUMBER = Number(JWT_EXPIRES_IN_REPLACE)
      expired_at = new Date(created_at).setDate(new Date(created_at).getDay() + JWT_EXPIRES_IN_NUMBER)
    }

    generateToken.expired_at = new Date(expired_at).toISOString()

    if (generateToken) {
      res_json.statusCode = 200
      res_json.message = "success, sign-in"
      generateToken = this.toolsService.objectSortAlphabetical(generateToken).after_sort
      res_json.data = generateToken
    } else {
      res_json.statusCode = 400
      res_json.message = "error, sign-in"
    }

    res_json = this.toolsService.objectSortAlphabetical(res_json).after_sort
    return res_json

    // return this.authService.generateToken({  //payload
    //   id: user.id,
    //   user_payload: user
    // })
  }

}
