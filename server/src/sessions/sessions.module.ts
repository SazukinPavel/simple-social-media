import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from '../schemas/session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  exports: [SessionsService],
  providers: [SessionsService],
})
export class SessionsModule {}
