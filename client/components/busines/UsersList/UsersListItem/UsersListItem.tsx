import React from "react";
import { useNavigateTo } from "../../../../hooks";
import { User } from "../../../../types";
import { AvatarImage } from "../../../ui";
import styles from "./UsersListItem.module.scss";

interface UsersListItemProps {
  user: User;
}

const UsersListItem: React.FC<UsersListItemProps> = ({ user }) => {
  const goToUser = useNavigateTo("/users/" + user._id);

  return (
    <div onClick={goToUser} className={styles.UserListItem}>
      <AvatarImage pictureName={user.avatarPicture} />
      <span>{user.username}</span>
    </div>
  );
};

export default UsersListItem;
