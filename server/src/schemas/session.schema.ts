import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  @Prop({ required: true })
  refreshToken: string;

  @Prop({ required: true })
  expiresIn: Date;

  @Prop({ type: { type: Types.ObjectId, ref: User.name } })
  user: User;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
