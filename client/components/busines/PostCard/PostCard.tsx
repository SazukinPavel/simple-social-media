import React from "react";
import Post from "../../../types/Post";
import styles from './PostCard.module.scss'
import PostCardButtons from "./PostCardButtons";

const PostCard:React.FC<Post>=(props)=>{
    return(
        <div className={styles.PostCard}>
            <div className={styles.ImageDiv}>
                <img src={'https://png.pngtree.com/png-clipart/20190515/original/pngtree-%EF%BB%BFblue-smoke-abstract-frame-png-image_3780311.jpg'}/>
            </div>
            <p>
                <span className={styles.UserName}>{props.owner?.username}:</span>
                <span className={styles.UserText}>{props.text}</span>
            </p>
            <PostCardButtons {...props}/>
        </div>
    )
}

export default PostCard