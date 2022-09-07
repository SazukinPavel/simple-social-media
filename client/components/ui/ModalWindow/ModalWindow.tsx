import styles from './ModalWindow.module.scss'
import React from "react";
import {useOutsideClick} from "../../../hooks";
import { CloseCircleOutlined } from '@ant-design/icons';

interface ModalWindowLocalProps{
    children:React.ReactNode
    isOpen:boolean
    toggle:Function
    className?:string
}

const ModalWindow:React.FC<ModalWindowLocalProps>=({children,isOpen,toggle,className=''})=>{

    const contentRef=React.useRef<HTMLDivElement>(null)

    useOutsideClick(contentRef, toggle, isOpen);

    if (!isOpen){
        return <></>
    }

    return(
        <div className={styles.ModalWindow}>
            <div ref={contentRef} className={[styles.ModalContent,className].join(' ')}>
                <span onClick={()=>toggle()} className={styles.CloseButton}><CloseCircleOutlined/></span>
                {children}
            </div>
        </div>
    )
}

export type ModalWindowProps=Omit<ModalWindowLocalProps,'children'>


export default ModalWindow