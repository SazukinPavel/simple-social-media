import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../schemas/post.schema';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreatePostDto } from './dto/CreatePost.dto';
import { PostReview } from '../schemas/post-review.schema';
import PostResponseDto from './dto/PostResponse.dto';
import { FilesService } from '../files/files.service';
import { FileType } from '../types/FileType';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(PostReview.name) private postReviewsModel: Model<PostReview>,
    private fileService: FilesService,
    private userService: UsersService,
  ) {}

  findById(id: string) {
    return this.postModel.findById(id).populate('owner').lean();
  }

  private getAll() {
    return this.postModel.find().populate('owner').lean();
  }

  async getPosts(user: User): Promise<PostResponseDto[]> {
    const posts = (await this.getAll()) as Post[];
    return this.constructPostResponse(posts, user);
  }

  private async constructPostResponse(posts: Post[], user: User) {
    const likedPost = (await this.getLikedPosts(user)) as PostReview[];
    return posts.map((p) => {
      const postReview = likedPost.find((l) => {
        return l.post._id.toString() === p._id.toString();
      });
      const postResponse: PostResponseDto = {
        ...p,
        isLiked: false,
        isDisliked: false,
      };
      if (postReview) {
        postResponse.isLiked = postReview.isPositive;
        postResponse.isDisliked = !postReview.isPositive;
      }
      return postResponse;
    });
  }

  private getLikedPosts(user: User) {
    return this.postReviewsModel
      .find({
        owner: user,
      })
      .populate('post')
      .lean();
  }

  updateLikesCount(postId: string, count: number) {
    return this.postModel.findByIdAndUpdate(postId, { likesCount: count });
  }

  updateDislikeCount(postId: string, count: number) {
    return this.postModel.findByIdAndUpdate(postId, { dislikeCount: count });
  }

  async create(dto: CreatePostDto, user: User) {
    let pictureName = '';
    if (dto.picture.toString() !== 'undefined') {
      pictureName = await this.fileService.saveFile(
        FileType.IMAGE,
        dto.picture,
      );
    }
    const post = await this.postModel.create({ ...dto, owner: user });
    if (pictureName) {
      post.pictureName = pictureName;
    }
    post.save();
    return post;
  }

  async getUserPosts(userId: string) {
    const user = await this.userService.findByIdOrThrowExeption(userId);
    return this.constructPostResponse(await this.getPostsByUser(userId), user);
  }

  private getPostsByUser(userId: string) {
    return this.postModel.find({ owner: userId }).populate('owner').lean();
  }
}
