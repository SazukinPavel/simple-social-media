import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Post } from "./post.schema";
import { User } from "./user.schema";

export type CommentDocument = Comment & mongoose.Document;

@Schema()
export class Comment {
    _id: string;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    })
    post:Post

    @Prop()
    text:string

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    })
    owner:User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
