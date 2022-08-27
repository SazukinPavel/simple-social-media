import {Lenta} from "../../components/busines/";
import React from "react";
import {useAuthorize, useRedirect, useTypedDispatch, useTypedSelector} from "../../hooks";
import {FetchPosts} from "../../store/thunks/posts";
import Title from "../../components/seo/Title";
import styles from '../../styles/Posts.module.scss'

const PostsPage=()=>{

    const dispatch=useTypedDispatch()
    const {isAuth,isTryAuthorize}=useTypedSelector(state => state.auth)
    useAuthorize()
    useRedirect('/login',!isAuth, isTryAuthorize)
    React.useEffect(()=>{
        if(isAuth){
            dispatch(FetchPosts())
        }
    },[isAuth])

    return(
        <div className={['center',styles.Posts].join(' ')}>
            <Title title={'Posts'}/>
            <Lenta/>
        </div>
    )
}

export default PostsPage

