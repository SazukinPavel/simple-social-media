import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from '../schemas/session.schema';
import { Model } from 'mongoose';
import { CreateSessionDto } from './dto/CreateSession.dto';
import { UpdateSessionDto } from './dto/UpdateSession.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
  ) {}

  async create({ user, refreshToken }: CreateSessionDto) {
    const session = await this.sessionModel.create({
      user,
      refreshToken,
      expiresIn: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
    });
    session.save();
    return session;
  }

  async update({ sessionId, refreshToken }: UpdateSessionDto) {
    const session = await this.sessionModel.findById(sessionId);
    session.refreshToken = refreshToken;
    session.expiresIn = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);
    session.save();
    return session;
  }

  async delete(sessionId: string) {
    const deletedSession = await this.sessionModel.findByIdAndDelete(sessionId);
    return !!deletedSession;
  }
}
