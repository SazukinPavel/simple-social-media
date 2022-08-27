import React, {FC} from "react";
import {User} from "../../../types";
import styles from './UserAvatar.module.scss';
import {ImageService} from "../../../services";

interface UserAvatarProps{
   user:User | null
}

const UserAvatar:FC<UserAvatarProps>=({user})=>{
    return (
        <div className={styles.UserAvatar}>
            <div className={styles.Avatar}>
                <img src={ImageService.getAvatar(user?.avatarPicture)}/>
            </div>
            <h3>{user?.username}</h3>
        </div>
    )
}

export default UserAvatar