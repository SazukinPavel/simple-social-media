import {useRouter} from "next/router";
import React from "react";
import {useTypedDispatch, useTypedSelector} from "../../../hooks";
import {FetchUserPosts} from "../../../store/thunks/posts";
import {PostList} from "../../../components/busines";


const UserPage=()=>{
    const {posts}=useTypedSelector(state => state.posts)
    const dispatch=useTypedDispatch()
    const {query:{id:userId}}=useRouter()
    React.useEffect(()=>{
       if(userId){
           console.log(userId)
           dispatch(FetchUserPosts(userId ? userId.toString() : 'undefined'))
       }
    },[userId])


    return(
        <div className={'center'}>
            <PostList posts={posts}/>
        </div>
    )
}

export default UserPage