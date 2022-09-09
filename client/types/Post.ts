import { User } from "./User";
import Comment from "./Comment";

export default interface Post {
  pictureName?: string;

  text: string;

  likesCount: number;

  owner: User;

  _id: string;

  isLiked: boolean;

  isDisliked: boolean;

  dislikeCount: number;

  comments?:Comment[]
}
