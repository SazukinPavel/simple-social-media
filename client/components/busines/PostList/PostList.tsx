import { Post } from "../../../types";
import React from "react";
import { PostCard } from "../index";

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((p) => (
        <PostCard key={p._id} {...p} />
      ))}
    </div>
  );
};

export default PostList;
