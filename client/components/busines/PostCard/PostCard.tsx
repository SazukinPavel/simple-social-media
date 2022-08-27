import React from "react";
import Post from "../../../types/Post";
import styles from './PostCard.module.scss'
import PostCardButtons from "./PostCardButtons";
import {ImageService} from "../../../services";
import PostCardAvatar from "./PostCardAvatar";

const PostCard:React.FC<Post>=(props)=>{
    return(
        <div className={styles.PostCard}>
            <PostCardAvatar user={props.owner}/>
            {
                props.pictureName &&
                <div className={styles.ImageDiv}>
                    <img src={ImageService.getImage(props.pictureName)}/>
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