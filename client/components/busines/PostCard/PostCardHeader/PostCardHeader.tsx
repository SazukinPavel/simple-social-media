import {ImageService} from "../../../../services";
import {User} from "../../../../types";
import React from "react";
import styles from './PostCardHeader.module.scss'
import {useRouter} from "next/router";
import Image from "next/image";
import PostCardMoreMenu from "./PostCardMoreMenu";

interface PostCardAvatarProps{
    user:User
}

const PostCardHeader:React.FC<PostCardAvatarProps>=({user})=>{

    const router=useRouter()

    const goToUser=()=>{
        router.push('/users/'+user._id)
    }

    return(
        <div className={styles.PostCardAvatar}>
            <div onClick={goToUser} className={styles.Avatar}>
                <div className={styles.AvatarContainer}>
                    <Image unoptimized={true} loader={()=>ImageService.getAvatar(user.avatarPicture)} src={ImageService.getAvatar(user.avatarPicture)} width="100%" height="100%" layout="responsive" />
                </div>
                <p>{user.username}</p>
            </div>
            <div className={styles.PostCardMenu}>
                <PostCardMoreMenu />
            </div>
        </div>
    )
}

export default PostCardHeader