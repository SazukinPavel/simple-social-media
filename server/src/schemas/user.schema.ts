import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  bio: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
