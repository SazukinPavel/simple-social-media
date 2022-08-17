import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { User } from '../schemas/user.schema';

@Injectable()
export class JwtService {
  signRefreshToken(userId: string) {
    return sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '30d',
    });
  }

  sighAccessToken(userId: string) {
    return sign({ _id: userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30m',
    });
  }

  verifyAccessToken(token: string) {
    return verify(token, process.env.ACCESS_TOKEN_SECRET) as User;
  }

  verifyRefreshToken(token: string) {
    return verify(token, process.env.REFRESH_TOKEN_SECRET) as User;
  }
}
