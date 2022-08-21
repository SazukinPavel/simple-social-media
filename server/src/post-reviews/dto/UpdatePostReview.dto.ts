import { PostReview } from '../../schemas/post-review.schema';

export class UpdatePostReviewDto {
  postReview: PostReview;
  isPositive: boolean;
}
