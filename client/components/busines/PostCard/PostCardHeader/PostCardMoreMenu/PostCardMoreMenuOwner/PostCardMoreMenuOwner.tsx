import {Post} from "../../../../../../types";
import React from "react";
import {useTypedDispatch} from "../../../../../../hooks";
import DeletePostThunk from "../../../../../../store/thunks/posts/DeletePostThunk";
import {useLogickTogle} from "../../../../../../hooks/useLogickTogle";
import EditPostModal from "../../../../../modals/EditPostModal";

interface PostCardMoreMenuOwnerProps{
    post:Post
}

const PostCardMoreMenuOwner:React.FC<PostCardMoreMenuOwnerProps>=({post})=>{

    const [isOpen,toggle]=useLogickTogle()
    const dispatch=useTypedDispatch()

    const deletePost=()=>{
        dispatch(DeletePostThunk(post._id))
    }

    return(
        <>
            <span onClick={deletePost}>Delete post</span>
            <span onClick={toggle}>Edit post</span>
            <EditPostModal isOpen={isOpen} toggle={toggle}/>
        </>
    )
}

export default PostCardMoreMenuOwner