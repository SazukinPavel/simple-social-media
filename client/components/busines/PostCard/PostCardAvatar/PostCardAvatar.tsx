import {ImageService} from "../../../../services";
import {User} from "../../../../types";
import React from "react";
import styles from './PostCardAvatar.module.scss'

interface PostCardAvatarProps{
    user:User
}

const PostCardAvatar:React.FC<PostCardAvatarProps>=({user})=>{

    return(
        <div className={styles.PostCardAvatar}>
            <img src={ImageService.getAvatar(user.avatarPicture)}/>
            <p>{user.username}</p>
        </div>
    )
}

export default PostCardAvatar