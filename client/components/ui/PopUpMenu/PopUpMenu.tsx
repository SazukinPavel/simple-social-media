import React from "react";
import styles from "./PopUpMenu.module.scss";

interface PopUpMenuProps{
    children:React.ReactNode
    isOpen:boolean
    className?:string
    toggle:any
}

const PopUpMenu:React.FC<PopUpMenuProps>=({children,className=''})=>{


    return(
        <div className={[styles.PopUpMenu,className].join(' ')}>
            {children}
        </div>
    )
}

export default PopUpMenu