import Post from "./Post";

export interface PostReview {
  _id: string;
  isPositive: boolean;
  post: Post;
}
