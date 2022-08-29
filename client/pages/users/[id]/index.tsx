import {useRouter} from "next/router";
import React from "react";
import {useRedirect, useTypedDispatch, useTypedSelector} from "../../../hooks";
import {FetchUserPosts} from "../../../store/thunks/posts";
import {PostList, UserCard} from "../../../components/busines";
import Title from "../../../components/seo/Title";
import {GetUserThunk} from "../../../store/thunks/userPage";


const UserPage=()=>{
    const {posts:{posts},userPage:{user,isUserNotExist}}=useTypedSelector(state => state)
    const dispatch=useTypedDispatch()
    const {query:{id:userId}}=useRouter()
    React.useEffect(()=>{
        const id=userId as string
        if(id){
            dispatch(GetUserThunk(id))
            dispatch(FetchUserPosts(id))
        }
    },[userId])

    useRedirect('/posts',isUserNotExist)

    if(!user){
        return <div>

        </div>
    }

    return(
        <div className={'center'}>
            <Title title={user?.username ?? 'Loading'}></Title>
            <UserCard user={user}/>
            <PostList posts={posts}/>
        </div>
    )
}

export default UserPage