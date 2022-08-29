import {useRouter} from "next/router";
import React from "react";
import {useRedirect, useTypedDispatch, useTypedSelector} from "../../../hooks";
import {FetchUserPosts} from "../../../store/thunks/posts";
import {PostList, UserCard} from "../../../components/busines";
import Title from "../../../components/seo/Title";
import {GetUserThunk} from "../../../store/thunks/userPage";
import {resetUser} from "../../../store/slices/userPageSlice";


const UserPage=()=>{
    const {posts:{posts},userPage:{user,isUserNotExist},auth:{user:loginUser}}=useTypedSelector(state => state)
    const dispatch=useTypedDispatch()
    const {query:{id:userId}}=useRouter()
    React.useEffect(()=>{
        const id=userId as string
        if(id){
            dispatch(GetUserThunk(id))
            dispatch(FetchUserPosts(id))
        }
        return ()=>{
            dispatch(resetUser())
        }
    },[userId])

    useRedirect('/',isUserNotExist)
    useRedirect('/posts/me',user?._id===loginUser?._id || !userId)

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