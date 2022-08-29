import {useRouter} from "next/router";
import React from "react";
import {useRedirect, useTypedDispatch, useTypedSelector} from "../../../hooks";
import {GetPostThunk} from "../../../store/thunks/postPage";
import {PostCard} from "../../../components/busines";

const PostPage=()=>{

    const {query:{id}}=useRouter()
    const dispatch=useTypedDispatch()
    const {post,isPostNotExist}=useTypedSelector(state=>state.postPage)

    React.useEffect(()=>{
        const postId=id as string
        if(postId){
            dispatch(GetPostThunk(postId))
        }
    },[])


    useRedirect('/',isPostNotExist || !id)

    if(!post){
        return <div></div>
    }

    return(
        <div className={'center'}>
            <PostCard {...post}/>
        </div>
    )
}

export default  PostPage