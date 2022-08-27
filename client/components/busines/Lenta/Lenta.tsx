import {useTypedSelector} from "../../../hooks";
import AddPost from "./AddPost";
import styles from './Lenta.module.scss'
import {PostList} from "../index";

const Lenta=()=>{

    const {posts}=useTypedSelector(state => state.posts)

    return(
        <div className={[styles.Lenta].join('')}>
            <AddPost/>
            <PostList posts={posts}/>
        </div>
    )
}

export default Lenta