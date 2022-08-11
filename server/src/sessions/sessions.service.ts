import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from '../schemas/session.schema';
import { Model } from 'mongoose';
import { CreateSessionDto } from './dto/CreateSession.dto';
import { UpdateSessionDto } from './dto/UpdateSession.dto';
import { User } from '../schemas/user.schema';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    private jwtService: JwtService,
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

  async createOrUpdate(user: User) {
    const session = await this.sessionModel.findOne({ user });
    const refreshToken = this.jwtService.signRefreshToken(user._id);
    if (session) {
      return this.update({
        sessionId: session._id.toString(),
        refreshToken,
      });
    }
    return this.create({ user, refreshToken });
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

  findById(id: string) {
    return this.sessionModel.findById(id).populate(User.name);
  }
}
