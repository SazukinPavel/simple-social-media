import {useTypedSelector} from "../../../hooks";
import PostCard from "../PostCard";
import AddPost from "./AddPost";
import styles from './Lenta.module.scss'

const Lenta=()=>{

    const {posts}=useTypedSelector(state => state.posts)

    return(
        <div className={[styles.Lenta].join('')}>
            <AddPost/>
            {posts.map((p)=><PostCard key={p._id}{...p}/>)}
        </div>
    )
}

export default Lenta