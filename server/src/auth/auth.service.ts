import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from '../schemas/session.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { JwtService } from '../services/jwt.service';
import { LoginDto } from './dto/Login.dto';
import { RegisterDto } from './dto/Register.dto';
import { CryptService } from '../services/crypt.service';
import { User } from '../schemas/user.schema';
import { AuthResponseDto } from './dto/AuthResponse.dto';
import { CookiesService } from '../services/cookies.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private cryptService: CryptService,
    private cookiesService: CookiesService,
  ) {}

  async login({ emailOrName, password }: LoginDto): Promise<User> {
    const user = await this.usersService.findUserByEmailOrName(emailOrName);
    if (!user) {
      throw new BadRequestException(
        'Нет пользователя с таким именем или почтой',
      );
    }
    const isPasswordEqual = await this.cryptService.comparePasswords(
      user.password,
      password,
    );
    if (!isPasswordEqual) {
      throw new BadRequestException('Неправильный пароль');
    }
    return user;
  }

  register(dto: RegisterDto): Promise<User> {}

  generateAuthResponse(user: User, res: Response) {
    const authResponse = new AuthResponseDto();
    authResponse.user = user;
    authResponse.accessToken = this.jwtService.sighAccessToken(user._id);
    this.cookiesService.setAuthCookies(res);
  }
}
