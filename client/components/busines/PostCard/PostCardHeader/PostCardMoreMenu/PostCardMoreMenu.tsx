import {MoreOutlined} from "@ant-design/icons";
import React from "react";
import styles from './PostCardMoreMenu.module.scss'
import {PopUpMenu} from "../../../../ui";
import {LinkConstructService} from "../../../../../services";
import {useNavigateTo} from "../../../../../hooks";

interface PostCardMoreMenuProps{
    postId:string
}

const PostCardMoreMenu:React.FC<PostCardMoreMenuProps>=({postId})=>{


    const copyUrl=()=>{
        navigator.clipboard.writeText(LinkConstructService.constructPostLink(postId))
    }

    const goToPost=useNavigateTo('/posts/'+postId)

    return(
        <div className={styles.More}>
            <PopUpMenu
                Trigger={<button className={styles.MoreButton}><MoreOutlined/></button>}
                Menu={
                    <div className={styles.MoreMenu}>
                        <span onClick={copyUrl}>Copy url</span>
                        <span onClick={goToPost}>Open as single</span>
                    </div>}/>
        </div>
    )
}

export default PostCardMoreMenu