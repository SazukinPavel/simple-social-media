import { Post } from '../../schemas/post.schema';

export default interface PostResponseDto extends Post {
  isLiked?: boolean;
  isDisliked?: boolean;
}
