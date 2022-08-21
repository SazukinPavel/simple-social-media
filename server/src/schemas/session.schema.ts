import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose';

export type SessionDocument = Session & mongoose.Document;

@Schema()
export class Session {
  @Prop({ required: true })
  refreshToken: string;

  @Prop({ required: true })
  expiresIn: Date;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: User;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
