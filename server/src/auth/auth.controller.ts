import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/Login.dto';
import { RegisterDto } from './dto/Register.dto';
import { AuthResponseDto } from './dto/AuthResponse.dto';

@Controller('auth')
export class AuthController {
  @Post('register')
  register(@Body() dto: RegisterDto): Promise<AuthResponseDto> {}

  @Post('login')
  login(@Body() dto: LoginDto): Promise<AuthResponseDto> {}
}
