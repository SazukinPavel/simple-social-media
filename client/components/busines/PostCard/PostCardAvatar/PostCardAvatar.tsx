import {ImageService} from "../../../../services";
import {User} from "../../../../types";
import React from "react";
import styles from './PostCardAvatar.module.scss'
import {useRouter} from "next/router";
import Image from "next/image";

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
            <div className={styles.AvatarContainer}>
                <Image loader={()=>ImageService.getAvatar(user.avatarPicture)} src={ImageService.getAvatar(user.avatarPicture)} width="100%" height="100%" layout="responsive" />
            </div>
            <p>{user.username}</p>
        </div>
    )
}

export default PostCardAvatar