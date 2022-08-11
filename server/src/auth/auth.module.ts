import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CryptService } from '../services/crypt.service';
import { JwtService } from '../services/jwt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from '../schemas/session.schema';
import { UsersService } from '../users/users.service';
import { CookiesService } from '../services/cookies.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    UsersService,
    CryptService,
    CookiesService,
  ],
})
export class AuthModule {}
