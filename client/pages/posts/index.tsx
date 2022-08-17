import Lenta from "../../components/busines/Lenta";
import {useEffect} from "react";
import {useAuthorize, useTypedDispatch} from "../../hooks";
import {FetchPosts} from "../../store/thunks/posts";

const PostsPage=()=>{

    const dispatch=useTypedDispatch()
    useAuthorize()
    useEffect(()=>{
        dispatch(FetchPosts())
    },[])

    return(
        <div>
            <Lenta/>
        </div>
    )
}

export default PostsPage