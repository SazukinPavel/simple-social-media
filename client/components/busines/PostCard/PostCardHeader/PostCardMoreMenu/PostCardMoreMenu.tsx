import {MoreOutlined} from "@ant-design/icons";
import React from "react";
import styles from './PostCardMoreMenu.module.scss'
import {PopUpMenu} from "../../../../ui";
import {LinkConstructService} from "../../../../../services";
import {useNavigateTo, useTypedSelector} from "../../../../../hooks";
import {Post} from "../../../../../types";
import PostCardMoreMenuOwner from "./PostCardMoreMenuOwner";

interface PostCardMoreMenuProps{
    post:Post
}

const PostCardMoreMenu:React.FC<PostCardMoreMenuProps>=({post})=>{

    const {user}=useTypedSelector(state=>state.auth)

    const copyUrl=()=>{
        navigator.clipboard.writeText(LinkConstructService.constructPostLink(post._id))
    }

    const goToPost=useNavigateTo('/posts/'+post._id)

    return(
        <div className={styles.More}>
            <PopUpMenu
                Trigger={<button className={styles.MoreButton}><MoreOutlined/></button>}
                Menu={
                    <div className={styles.MoreMenu}>
                        <span onClick={copyUrl}>Copy url</span>
                        <span onClick={goToPost}>Open as single</span>
                        {post.owner._id===user?._id && <PostCardMoreMenuOwner post={post}/>}
                    </div>}/>
        </div>
    )
}

export default PostCardMoreMenu