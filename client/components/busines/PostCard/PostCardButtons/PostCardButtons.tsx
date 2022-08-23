import styles from './PostCardButton.module.scss'
import React from "react";
import {CommentOutlined, DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined} from "@ant-design/icons";
import {useTypedDispatch} from "../../../../hooks";
import {DeletePostReviewThunk, SetPostReviewThunk} from "../../../../store/thunks/posts";

interface PostCardButtons{
    isLiked:boolean
    isDisliked:boolean
    likesCount:number
    dislikeCount:number
    _id:string
}

const PostCardButtons:React.FC<PostCardButtons>=({_id,isLiked,isDisliked,likesCount,dislikeCount})=>{

    const dispatch=useTypedDispatch()

    const likePost=()=>{
        if(isLiked){
            dispatch(DeletePostReviewThunk(_id))
        }else {
            dispatch(SetPostReviewThunk({postId:_id,isPositive:true}))
        }
    }

    const dislikePost=()=>{
        if (isDisliked){
            dispatch(DeletePostReviewThunk(_id))
        }else {
            dispatch(SetPostReviewThunk({postId:_id,isPositive:false}))
        }
    }

    return <div className={styles.PostCardButtons}>
        <div>
            <button onClick={dislikePost}>
                {isDisliked?<DislikeFilled/>:<DislikeOutlined />}
            </button>
            <span>{dislikeCount}</span>
        </div>
        <div>
            <button onClick={likePost}>
                {isLiked?<LikeFilled/>:<LikeOutlined />}
            </button>
            <span>{likesCount}</span>
        </div>
        <div>
            <button>
                <CommentOutlined />
            </button>
        </div>
    </div>
}

export default PostCardButtons