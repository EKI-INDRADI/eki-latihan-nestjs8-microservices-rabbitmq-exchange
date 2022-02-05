import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiHeaders, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }

  @Get()
  // @ApiBearerAuth() // terlalu simple
  
  //================== INI MEMUNCULKAN TEXTBOX UNTUK ISI HEADER 'eki-custom-token'
  // @ApiHeader({ //   reference : // https://docs.nestjs.com/openapi/operations
  //   name: 'eki-custom-token',
  //   description: 'Eki Custom header',
  // })
  // NOTE : masih kurang keren
  //================== /INI MEMUNCULKAN TEXTBOX UNTUK ISI HEADER 'eki-custom-token'

  // @ApiBearerAuth() INFO : user-service\src\main.ts
  @ApiSecurity('eki-custom-token')
  @UseGuards(JwtGuard)
  checkUserController(@Request() req) {
    return req.user
  }

  @Post()
  async loginController(@Body() authDto: AuthDto) {
    let user = await this.authService.checkUser(authDto.username, authDto.password)
    return this.authService.generateToken({  //payload
      id: user.id,
      user_payload: user
    })
  }

}
