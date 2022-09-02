import {useRouter} from "next/router";
import React from "react";
import {useRedirect, useTypedDispatch, useTypedSelector} from "../../../hooks";
import {GetPostThunk} from "../../../store/thunks/postPage";
import {PostCard} from "../../../components/busines";
import Title from "../../../components/seo/Title";

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
        return <div>
            <Title>Loading...</Title>
        </div>
    }

    return(
        <>
            <Title>{post.text.slice(0,10)}</Title>
            <div className={'center'}>
                <PostCard {...post}/>
            </div>
        </>
    )
}

export default  PostPage