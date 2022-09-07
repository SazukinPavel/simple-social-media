import styles from "./UserBio.module.scss";
import React from "react";

interface UserBioProps {
  text?: string;
}

const UserBio: React.FC<UserBioProps> = ({ text }) => {
  return (
    <p className={styles.Bio}>
      <span className={styles.About}>About me:</span>
      <span className={styles.Text}>{text}</span>
    </p>
  );
};

export default UserBio;
