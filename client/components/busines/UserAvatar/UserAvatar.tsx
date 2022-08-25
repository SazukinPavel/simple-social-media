import React, {FC} from "react";
import {User} from "../../../types";
import styles from './UserAvatar.module.scss';

interface UserAvatarProps{
   user:User | null
}

const UserAvatar:FC<UserAvatarProps>=({user})=>{
    return (
        <div className={styles.UserAvatar}>
            <div className={styles.Avatar}>
                <img src={user?.avatarPicture ?process.env.NEXT_PUBLIC_STATIC_URL+user?.avatarPicture: "https://www.w3schools.com/howto/img_avatar.png"}/>
            </div>
            <h3>{user?.username}</h3>
        </div>
    )
}

export default UserAvatar