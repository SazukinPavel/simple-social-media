import React, {FC} from "react";
import {User} from "../../../types";
import styles from './UserAvatar.module.scss';
import {ImageService} from "../../../services";
import Image from "next/image";

interface UserAvatarProps{
   user:User | null
}

const UserAvatar:FC<UserAvatarProps>=({user})=>{
    return (
        <div className={styles.UserAvatar}>
            <div className={styles.Avatar}>
                <Image loader={()=>ImageService.getAvatar(user?.avatarPicture)}
                       src={ImageService.getAvatar(user?.avatarPicture)}
                       width="100%" height="100%" layout="responsive" unoptimized={true}
                />
            </div>
            <h3>{user?.username}</h3>
        </div>
    )
}

export default UserAvatar