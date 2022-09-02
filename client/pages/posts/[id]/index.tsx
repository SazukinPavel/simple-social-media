import React from "react";
import {useTypedDispatch, useTypedSelector} from "../../../hooks";
import {PostCard} from "../../../components/busines";
import Title from "../../../components/seo/Title";
import {GetServerSideProps, NextPage} from "next";
import {PostsService} from "../../../services";
import {Post} from "../../../types";
import {setPostPage} from "../../../store/slices/postPageSlice";
import {addPostToPosts} from "../../../store/slices/postsSlice";

interface PostPageProps{
    post:Post
}

const PostPage:NextPage<PostPageProps>=({post})=>{

    const dispatch=useTypedDispatch()
    const {post:storePost}=useTypedSelector(state=>state.postPage)

    React.useEffect(()=>{
        if(!post){
            return
        }
        dispatch(setPostPage(post))
        dispatch(addPostToPosts(post))
    },[post])

    if(!storePost){
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const id=context.params?.id as string
        const post=(await PostsService.findById(id)).data
        if(!post){
            return {
                notFound:true
            }
        }
        return{
            props:{
                post
            }
        }
    }catch(e){
        return {
            notFound:true
        }
    }
}



export default  PostPage