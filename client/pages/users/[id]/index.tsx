import {useRouter} from "next/router";
import React from "react";
import {useRedirect, useTypedDispatch, useTypedSelector} from "../../../hooks";
import {FetchUserPosts} from "../../../store/thunks/posts";
import {PostList, UserCard} from "../../../components/busines";
import Title from "../../../components/seo/Title";
import {GetUserThunk} from "../../../store/thunks/userPage";
import {GetServerSideProps, NextPage} from "next";
import {UsersService} from "../../../services";
import {User} from "../../../types";
import {setUserPageUser} from "../../../store/slices/userPageSlice";

interface UserPageProps{
    serverSideUser:User
}

const UserPage:NextPage<UserPageProps>=({serverSideUser})=>{
    const {posts:{posts},userPage:{user},auth:{user:loginUser}}=useTypedSelector(state => state)
    const dispatch=useTypedDispatch()
    const {query:{id:userId}}=useRouter()

    React.useEffect(()=>{
        console.log(serverSideUser)
        const id=userId as string
        if(serverSideUser){
            dispatch(setUserPageUser(serverSideUser))
            return
        }
        if(id){
            dispatch(GetUserThunk(id))
            dispatch(FetchUserPosts(id))
        }
    },[])


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
       console.log(id)
       const user=(await UsersService.getUserById(id)).data
       console.log(user)
       if(!user){
           throw new Error()
       }
       console.log('1')
       return{
           props:{
               serverSideUser: user
           }
       }
   }catch(e){
       return {
           notFound:true
       }
   }
}

export default UserPage