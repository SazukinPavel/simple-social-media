import React from "react";
import {useTypedDispatch, useTypedSelector} from "../../../hooks";
import {FetchUserPosts} from "../../../store/thunks/posts";
import {PostList, UserCard} from "../../../components/busines";
import Title from "../../../components/seo/Title";
import {GetServerSideProps, NextPage} from "next";
import {UsersService} from "../../../services";
import {User} from "../../../types";
import {resetUser, setUserPageUser} from "../../../store/slices/userPageSlice";
import {useRouter} from "next/router";

interface UserPageProps{
    userProps:User
}

const UserPage:NextPage<UserPageProps>=({userProps})=>{
    const {posts:{posts},userPage:{user},auth:{user:loginedUser}}=useTypedSelector(state => state)
    const router=useRouter()
    const dispatch=useTypedDispatch()

    React.useEffect(()=>{
        if(!userProps){
            return
        }
        if(loginedUser?._id===userProps._id){
            router.push('/posts/me')
        }
        if(userProps){
            dispatch(setUserPageUser(userProps))
            dispatch(FetchUserPosts(user?._id as string))
        }
        return ()=>{
            dispatch(resetUser())
        }
    },[userProps])


    if(!user){
        return <div>
            <Title>Loading...</Title>
        </div>
    }

    return(
        <>
            <Title>{user.username}</Title>
            <div className={'center'}>
                <UserCard user={user}/>
                <PostList posts={posts}/>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   try {
       const id=context.params?.id as string
       const user=(await UsersService.getUserById(id)).data
       if(!user){
           return {
               notFound:true
           }
       }
       return{
           props:{
               userProps: user
           }
       }
   }catch(e){
       return {
           notFound:true
       }
   }
}

export default UserPage