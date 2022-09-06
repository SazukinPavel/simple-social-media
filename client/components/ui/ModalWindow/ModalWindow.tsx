import styles from './ModalWindow.module.scss'
import React from "react";
import {useOutsideClick} from "../../../hooks";

interface ModalWindowLocalProps{
    children:React.ReactNode
    isOpen:boolean
    toggle:Function
}

const ModalWindow:React.FC<ModalWindowLocalProps>=({children,isOpen,toggle})=>{

    if (!isOpen){
        return <></>
    }

    const contentRef=React.useRef<HTMLDivElement>(null)

    useOutsideClick(contentRef, toggle, isOpen);


    return(
        <div className={styles.ModalWindow}>
           <div ref={contentRef} className={styles.ModalContent}>
               {children}
           </div>
        </div>
    )
}

export type ModalWindowProps=Omit<ModalWindowLocalProps,'children'>


export default ModalWindow