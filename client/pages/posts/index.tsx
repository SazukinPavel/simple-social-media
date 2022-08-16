import Lenta from "../../components/busines/Lenta";
import {useEffect} from "react";
import {useTypedDispatch} from "../../hooks";
import {fetchPosts} from "../../store/slices/postsSlice";

const PostsPage=()=>{

    const dispatch=useTypedDispatch()

    useEffect(()=>{
        dispatch(fetchPosts())
    },[])

    return(
        <div>
            <Lenta/>
        </div>
    )
}

export default PostsPage