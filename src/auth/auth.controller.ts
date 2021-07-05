import { Controller, Body, Get, Post, Request, UseGuards, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import AuthDto from './dto/login.dto'


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthDto) {
    console.log('call auth/login')
    const user = await this.authService.validateUser(
      body.login,
      body.password
    )
    if (!user) throw new UnauthorizedException('invalid user name or password')
    return this.authService.login(user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
