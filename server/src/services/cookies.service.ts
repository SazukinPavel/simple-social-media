import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { NodeEnv } from '../types/NodeEnvEnum';

@Injectable()
export class CookiesService {
  setAuthCookies(res: Response, refreshToken: string) {
    res.cookie('token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === NodeEnv.PRODUCTION ? true : false,
      path: '/api',
      expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
    });
  }

  resetAuthCookies(res: Response) {
    res.cookie('token', '', {
      httpOnly: true,
      path: '/api',
      expires: new Date(0),
    });
  }
}
