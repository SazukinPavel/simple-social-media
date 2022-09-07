import { ImageService } from "../../../../services";
import { Post, User } from "../../../../types";
import React from "react";
import styles from "./PostCardHeader.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import PostCardMoreMenu from "./PostCardMoreMenu";
import { LittleImage } from "../../../ui";

interface PostCardAvatarProps {
  user: User;
  post: Post;
}

const PostCardHeader: React.FC<PostCardAvatarProps> = ({ user, post }) => {
  const router = useRouter();

  const goToUser = () => {
    router.push("/users/" + user._id);
  };

  return (
    <div className={styles.PostCardAvatar}>
      <div onClick={goToUser} className={styles.Avatar}>
        <LittleImage
          loader={() => ImageService.getAvatar(user.avatarPicture)}
          src={ImageService.getAvatar(user.avatarPicture)}
        />
        <p>{user.username}</p>
      </div>
      <div className={styles.PostCardMenu}>
        <PostCardMoreMenu post={post} />
      </div>
    </div>
  );
};

export default PostCardHeader;
