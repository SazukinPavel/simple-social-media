import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from '../schemas/session.schema';
import { CookiesService, JwtService } from '../services';
import { SessionsService } from '../sessions/sessions.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, CookiesService, SessionsService],
})
export class AuthModule {}
