import React from "react";
import Post from "../../../types/Post";
import styles from './PostCard.module.scss'

const PostCard:React.FC<Post>=({text,likesCount,pictureName,owner})=>{
    return(
        <div className={styles.PostCard}>
            <div className={styles.ImageDiv}>
                <img src={'https://png.pngtree.com/png-clipart/20190515/original/pngtree-%EF%BB%BFblue-smoke-abstract-frame-png-image_3780311.jpg'}/>
            </div>
            <p>
                <span className={styles.UserName}>{owner?.username}:</span>
                <span className={styles.UserText}>{text}</span>
                <span>{likesCount}</span>
            </p>
        </div>
    )
}

export default PostCard