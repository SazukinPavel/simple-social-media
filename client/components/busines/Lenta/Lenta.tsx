import {useTypedSelector} from "../../../hooks";
import PostCard from "../PostCard";

const Lenta=()=>{

    const {posts}=useTypedSelector(state => state.posts)

    return(
        <div>
            {posts.map((p)=><PostCard key={p._id}{...p}/>)}
        </div>
    )
}

export default Lenta