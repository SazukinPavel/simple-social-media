import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from '../schemas/session.schema';
import { UsersService } from '../users/users.service';
import { CryptService, CookiesService, JwtService } from '../services';
import { SessionsService } from '../sessions/sessions.service';

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
    SessionsService,
  ],
})
export class AuthModule {}
