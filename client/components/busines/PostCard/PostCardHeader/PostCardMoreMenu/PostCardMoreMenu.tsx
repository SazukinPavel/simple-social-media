import {MoreOutlined} from "@ant-design/icons";
import React from "react";
import {useLogickTogle} from "../../../../../hooks/useLogickTogle";
import styles from './PostCardMoreMenu.module.scss'
import {PopUpMenu} from "../../../../ui";

const PostCardMoreMenu=()=>{
    const [isOpen,toggle]=useLogickTogle(false)

    return(
        <div className={styles.More}>
            <button className={styles.MoreButton} onClick={toggle} ><MoreOutlined/></button>
            {isOpen &&  <PopUpMenu isOpen={isOpen} className={styles.MoreMenu}>
                <span>Copy url</span>
                <span>Open as single</span>
            </PopUpMenu>}
        </div>
    )
}

export default PostCardMoreMenu