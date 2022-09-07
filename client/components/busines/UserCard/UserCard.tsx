import { UserAvatar } from "../index";
import React from "react";
import { User } from "../../../types";
import UserBio from "./UserBio";
import styles from "./UserCard.module.scss";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className={styles.UserCard}>
      <UserAvatar user={user} />
      <UserBio text={user.bio} />
    </div>
  );
};

export default UserCard;
