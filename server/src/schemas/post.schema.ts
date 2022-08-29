import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';

export type PostDocument = Post & mongoose.Document;

@Schema()
export class Post {
  _id: string;

  @Prop()
  pictureName: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: 0 })
  likesCount: number;

  @Prop({ default: 0 })
  dislikeCount: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  owner: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
