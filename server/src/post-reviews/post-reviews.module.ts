import { Module } from '@nestjs/common';
import { PostReviewsController } from './post-reviews.controller';
import { PostReviewsService } from './post-reviews.service';
import { PostsModule } from '../posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostReview, PostReviewSchema } from '../schemas/post-review.schema';
import { PostsService } from '../posts/posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PostReview.name, schema: PostReviewSchema },
    ]),
    PostsModule,
  ],
  controllers: [PostReviewsController],
  providers: [PostReviewsService],
})
export class PostReviewsModule {}
