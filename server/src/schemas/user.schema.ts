import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;

  @Prop({ required: true })
  username: string;

  @Prop()
  bio: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  avatarPicture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
