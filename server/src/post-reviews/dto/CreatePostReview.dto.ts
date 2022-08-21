import { Post } from '../../schemas/post.schema';
import { User } from '../../schemas/user.schema';

export class CreatePostReviewDto {
  post: Post;
  isPositive: boolean;
  owner: User;
}
