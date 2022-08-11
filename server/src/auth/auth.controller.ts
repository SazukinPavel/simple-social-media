import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginDto } from './dto/Login.dto';
import { RegisterDto } from './dto/Register.dto';
import { AuthResponseDto } from './dto/AuthResponse.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Cookies } from '../decorators/cookie.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res() res: Response,
  ): Promise<AuthResponseDto> {
    const user = await this.authService.register(dto);
    return this.authService.authorize(user, res);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res() res: Response,
  ): Promise<AuthResponseDto> {
    const user = await this.authService.login(dto);
    return this.authService.authorize(user, res);
  }

  @Post('access')
  async refreshAccessToken(
    @Cookies('token') refreshToken: string,
    @Res() res: Response,
  ) {
    const user = await this.authService.getUserByRefreshToken(refreshToken);
    return this.authService.authorize(user, res);
  }
}
