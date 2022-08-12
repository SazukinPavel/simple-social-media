import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../schemas/post.schema';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreatePostDto } from './dto/CreatePost.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  findById(id: string) {
    return this.postModel.findById(id).populate(User.name);
  }

  getAll() {
    return this.postModel.find().populate(User.name);
  }

  async create(dto: CreatePostDto, user: User) {
    const post = await this.postModel.create({ ...dto, owner: user });
    post.save();
    return post;
  }
}
