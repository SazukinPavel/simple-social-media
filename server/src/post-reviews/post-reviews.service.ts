import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostReview } from '../schemas/post-review.schema';
import { Model } from 'mongoose';
import { CreatePostReviewDto } from './dto/CreatePostReview.dto';
import { PostsService } from '../posts/posts.service';
import { SetPostReviewDto } from './dto/SetPostReview.dto';
import { User } from '../schemas/user.schema';
import { UpdatePostReviewDto } from './dto/UpdatePostReview.dto';

@Injectable()
export class PostReviewsService {
  constructor(
    @InjectModel(PostReview.name) private postReviewsModel: Model<PostReview>,
    private postsService: PostsService,
  ) {}

  private async createPostReview({
    post,
    isPositive,
    owner,
  }: CreatePostReviewDto) {
    const postReview = await this.postReviewsModel.create({
      owner,
      isPositive,
      post,
    });
    await postReview.save();
    if (isPositive) {
      this.postsService.updateLikesCount(post._id, post.likesCount + 1);
    } else {
      this.postsService.updateDislikeCount(post._id, post.dislikeCount + 1);
    }
    return true;
  }

  private async updatePostReview({
    isPositive,
    postReview,
  }: UpdatePostReviewDto) {
    if (isPositive === postReview.isPositive) {
      return true;
    }
    await this.postReviewsModel.findByIdAndUpdate(postReview._id, {
      isPositive,
    });
    if (isPositive) {
      this.postsService.updateLikesCount(
        postReview.post._id,
        postReview.post.likesCount + 1,
      );
      this.postsService.updateDislikeCount(
        postReview.post._id,
        postReview.post.dislikeCount - 1,
      );
    } else {
      this.postsService.updateDislikeCount(
        postReview.post._id,
        postReview.post.dislikeCount + 1,
      );
      this.postsService.updateLikesCount(
        postReview.post._id,
        postReview.post.likesCount - 1,
      );
    }
    return true;
  }

  async setPostReview(dto: SetPostReviewDto, user: User) {
    const post = await this.postsService.findById(dto.postId);
    if (!post) {
      throw new BadRequestException('This post was not found');
    }
    const postReview = await this.postReviewsModel.findOne({
      owner: user,
      post,
    });
    if (postReview) {
      return this.updatePostReview({ isPositive: dto.isPositive, postReview });
    }
    return await this.createPostReview({ ...dto, post, owner: user });
  }

  async deleteReview(id: string, user: User) {
    const postReview = await this.postReviewsModel.findById(id);
    if (user._id === postReview._id) {
      this.postReviewsModel.findByIdAndDelete(id);
      return true;
    }
    throw new ForbiddenException('You cannot delete someone else review');
  }
}
