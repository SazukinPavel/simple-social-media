import React from "react";
import Post from "../../../types/Post";
import styles from './PostCard.module.scss'
import {ImageService} from "../../../services";
import PostCardHeader from "./PostCardHeader";
import Image from "next/image";
import PostCardFooter from "./PostCardFooter";

const PostCard:React.FC<Post>=(props)=>{
    return(
        <div className={styles.PostCard}>
            <PostCardHeader post={props} user={props.owner}/>
            {
                props.pictureName!==undefined &&
                <div className={styles.ImageDiv}>
                    <Image unoptimized={true} loader={()=>ImageService.getImage(props.pictureName ?? '')} src={ImageService.getImage(props.pictureName)} width="100%" height="80%" layout="responsive"/>
                </div>
            }
            <p>
                <span className={styles.UserName}>{props.owner?.username}:</span>
                <span className={styles.UserText}>{props.text}</span>
            </p>
            <PostCardFooter {...props}/>
        </div>
    )
}

export default PostCard