import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from '../schemas/session.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/Login.dto';
import { RegisterDto } from './dto/Register.dto';
import { User } from '../schemas/user.schema';
import { AuthResponseDto } from './dto/AuthResponse.dto';
import { Response } from 'express';
import { CookiesService, CryptService, JwtService } from '../services';
import { SessionsService } from '../sessions/sessions.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private cookiesService: CookiesService,
    private sessionService: SessionsService,
  ) {}

  async login(dto: LoginDto): Promise<User> {
    const user = this.usersService.validateUser(dto);
    return user;
  }

  async register(dto: RegisterDto): Promise<User> {
    const userWithSameName = await this.usersService.findUserByName(
      dto.username,
    );
    if (userWithSameName) {
      throw new BadRequestException('A user with this name already exists');
    }
    const userWithSameEmail = await this.usersService.findUserByEmail(
      dto.email,
    );
    if (userWithSameEmail) {
      throw new BadRequestException('A user with this email already exists');
    }
    const user = await this.usersService.addUser({ ...dto });
    return user;
  }

  async authorize(user: User, res: Response): Promise<AuthResponseDto> {
    const authResponse = new AuthResponseDto();
    authResponse.user = user;
    authResponse.accessToken = this.jwtService.sighAccessToken(user._id);
    const session = await this.sessionService.createOrUpdate(user);
    this.cookiesService.setAuthCookies(res, session.refreshToken);
    return authResponse;
  }

  async getUserByRefreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new ForbiddenException('Not authorized user');
    }
    const session = await this.sessionService.findByRefreshToken(refreshToken);
    if (!session) {
      throw new ForbiddenException('Not founded user');
    }
    const user = session.user;
    if (!user) {
      throw new ForbiddenException('Not valid token');
    }
    return user;
  }
}
