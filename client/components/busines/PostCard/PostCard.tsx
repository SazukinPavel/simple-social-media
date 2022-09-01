import React from "react";
import Post from "../../../types/Post";
import styles from './PostCard.module.scss'
import PostCardButtons from "./PostCardButtons";
import {ImageService} from "../../../services";
import PostCardAvatar from "./PostCardAvatar";
import Image from "next/image";

const PostCard:React.FC<Post>=(props)=>{
    return(
        <div className={styles.PostCard}>
            <PostCardAvatar user={props.owner}/>
            {
                props.pictureName!==undefined &&
                <div className={styles.ImageDiv}>
                    <Image loader={()=>ImageService.getImage(props.pictureName ?? '')} src={ImageService.getImage(props.pictureName)} width="100%" height="80%" layout="responsive"/>
                </div>
            }
            <p>
                <span className={styles.UserName}>{props.owner?.username}:</span>
                <span className={styles.UserText}>{props.text}</span>
            </p>
            <PostCardButtons {...props}/>
        </div>
    )
}

export default PostCard