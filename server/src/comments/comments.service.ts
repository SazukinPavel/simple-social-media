import {
    Injectable,
  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';
import { Comment } from 'src/schemas/comment.schema';
import { User } from 'src/schemas/user.schema';
import AddCommentDto from './dto/AddComment.dto';

  @Injectable()
  export class CommentsService {
  
    constructor(private readonly postsService:PostsService,
      @InjectModel(Comment.name) private commentModel: Model<Comment>,
      ){}

    async addComment(dto:AddCommentDto,user:User){
      const post= await this.postsService.findByIdOrThrowExeption(dto.postId)
      const comment=await this.commentModel.create({text:dto.text,post,owner:user,})
      await comment.save()
      return comment
    }

    async findByPostId(postId:string){
      const post= await this.postsService.findByIdOrThrowExeption(postId)
      return this.commentModel.find({post}).populate('owner').lean()
    }



  }
  