import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  pictureName: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: 0 })
  likesCount: number;

  @Prop({ type: { type: Types.ObjectId, ref: User.name } })
  owner: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
