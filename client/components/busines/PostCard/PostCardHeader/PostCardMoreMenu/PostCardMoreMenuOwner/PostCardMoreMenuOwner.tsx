import {Post} from "../../../../../../types";
import React from "react";
import {useTypedDispatch} from "../../../../../../hooks";
import DeletePostThunk from "../../../../../../store/thunks/posts/DeletePostThunk";

interface PostCardMoreMenuOwnerProps{
    post:Post
}

const PostCardMoreMenuOwner:React.FC<PostCardMoreMenuOwnerProps>=({post})=>{

    const dispatch=useTypedDispatch()

    const deletePost=()=>{
        dispatch(DeletePostThunk(post._id))
    }

    return(
        <>
            <span onClick={deletePost}>Delete post</span>
            <span>Edit post</span>
        </>
    )
}

export default PostCardMoreMenuOwner