import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomRequest } from '../types/CustomRequest';
import { UsersService } from '../users/users.service';
import { JwtService } from '../services';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async use(req: CustomRequest, res: any, next: () => void) {
    const userToken = req.headers['authorization'];
    if (userToken) {
      const jwtUser = this.jwtService.verifyAccessToken(userToken);
      if (jwtUser) {
        const realUser = await this.userService.findUserById(jwtUser._id);
        if (realUser) {
          req.user = realUser;
        }
      }
    }
    next();
  }
}
