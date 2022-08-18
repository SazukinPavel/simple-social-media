import Lenta from "../../components/busines/Lenta";
import {useEffect} from "react";
import {useAuthorize, useRedirect, useTypedDispatch, useTypedSelector} from "../../hooks";
import {FetchPosts} from "../../store/thunks/posts";
import Title from "../../components/seo/Title";

const PostsPage=()=>{

    const dispatch=useTypedDispatch()
    const {isAuth,isTryAuthorize}=useTypedSelector(state => state.auth)
    useAuthorize()
    useRedirect('/login',!isAuth, isTryAuthorize)
    useEffect(()=>{
        if(isAuth){
            dispatch(FetchPosts())
        }
    },[isAuth])

    return(
        <div>
            <Title title={'Posts'}/>
            <Lenta/>
        </div>
    )
}

export default PostsPage

