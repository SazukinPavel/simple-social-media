import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Post } from './post.schema';

export type UserDocument = User & mongoose.Document;

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

  @Prop({
    required: false,
    type: [mongoose.Schema.Types.ObjectId],
    ref: Post.name,
  })
  posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);
