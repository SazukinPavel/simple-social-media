import {ImageService} from "../../../../services";
import {User} from "../../../../types";
import React from "react";
import styles from './PostCardAvatar.module.scss'
import {useRouter} from "next/router";

interface PostCardAvatarProps{
    user:User
}

const PostCardAvatar:React.FC<PostCardAvatarProps>=({user})=>{

    const router=useRouter()

    const goToUser=()=>{
        router.push('/users/'+user._id)
    }

    return(
        <div onClick={goToUser} className={styles.PostCardAvatar}>
            <img src={ImageService.getAvatar(user.avatarPicture)}/>
            <p>{user.username}</p>
        </div>
    )
}

export default PostCardAvatar