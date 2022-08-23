import React from "react";
import Post from "../../../types/Post";
import styles from './PostCard.module.scss'
import PostCardButtons from "./PostCardButtons";

const PostCard:React.FC<Post>=(props)=>{
    return(
        <div className={styles.PostCard}>
            {
                props.pictureName &&
                <div className={styles.ImageDiv}>
                    <img src={process.env.NEXT_PUBLIC_STATIC_URL+props.pictureName}/>
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