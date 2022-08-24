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
import PostReviewResponseDto from './dto/PostReviewResponse.dto';

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
  }: CreatePostReviewDto): Promise<PostReviewResponseDto> {
    const postReview = await this.postReviewsModel.create({
      owner,
      isPositive,
      post,
    });
    await postReview.save();
    if (isPositive) {
      await this.postsService.updateLikesCount(post._id, post.likesCount + 1);
    } else {
      await this.postsService.updateDislikeCount(
        post._id,
        post.dislikeCount + 1,
      );
    }
    return { isSet: true };
  }

  private async updatePostReview({
    isPositive,
    postReview,
  }: UpdatePostReviewDto): Promise<PostReviewResponseDto> {
    if (isPositive === postReview.isPositive) {
      throw new BadRequestException(
        'Same post-review with same positive quality already exists',
      );
    }
    await this.postReviewsModel.findByIdAndUpdate(postReview._id, {
      isPositive,
    });
    if (isPositive) {
      await this.resetLike(postReview);
    } else {
      await this.resetDislikes(postReview);
    }
    return { isSet: true };
  }

  private async resetDislikes(postReview: PostReview) {
    await this.postsService.updateDislikeCount(
      postReview.post._id,
      postReview.post.dislikeCount + 1,
    );
    await this.postsService.updateLikesCount(
      postReview.post._id,
      postReview.post.likesCount - 1,
    );
  }

  private async resetLike(postReview: PostReview) {
    await this.postsService.updateLikesCount(
      postReview.post._id,
      postReview.post.likesCount + 1,
    );
    await this.postsService.updateDislikeCount(
      postReview.post._id,
      postReview.post.dislikeCount - 1,
    );
  }

  async setPostReview(dto: SetPostReviewDto, user: User) {
    const post = await this.postsService.findById(dto.postId);
    if (!post) {
      throw new BadRequestException('This post was not found');
    }
    const postReview = await this.findByUserAndPostId(user, post._id);
    if (postReview) {
      return this.updatePostReview({ isPositive: dto.isPositive, postReview });
    }
    return await this.createPostReview({ ...dto, post, owner: user });
  }

  private findByUserAndPostId(user: User, postId: string) {
    return this.postReviewsModel
      .findOne({
        post: postId,
        user,
      })
      .populate('post');
  }

  async deleteReview(
    postId: string,
    user: User,
  ): Promise<PostReviewResponseDto> {
    const postReview = await this.findByUserAndPostId(user, postId);
    if (!postReview) {
      throw new BadRequestException('This like not exist!');
    }
    if (user._id.toString() === postReview.owner._id.toString()) {
      if (postReview.isPositive) {
        await this.postsService.updateLikesCount(
          postReview.post._id,
          postReview.post.likesCount - 1,
        );
      } else {
        await this.postsService.updateDislikeCount(
          postReview.post._id,
          postReview.post.dislikeCount - 1,
        );
      }
      await this.postReviewsModel.findByIdAndDelete(postReview._id);
      return { isSet: true };
    }
    throw new ForbiddenException('You cannot delete someone else review');
  }
}
