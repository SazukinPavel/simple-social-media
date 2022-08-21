import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';
import { Post } from './post.schema';

export type PostReviewDocument = PostReview & mongoose.Document;

@Schema()
export class PostReview {
  _id: string;

  @Prop({ required: true })
  isPositive: boolean;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Post.name,
  })
  post: Post;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  owner: User;
}

export const PostReviewSchema = SchemaFactory.createForClass(PostReview);
