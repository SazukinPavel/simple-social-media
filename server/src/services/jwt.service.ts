import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  signRefreshToken(userId: string) {
    return sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '30d',
    });
  }

  sighAccessToken(userId: string) {
    return sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30m',
    });
  }
}
