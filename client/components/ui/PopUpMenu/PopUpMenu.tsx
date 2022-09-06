import React from "react";
import {useOutsideClick} from "../../../hooks";
import {useLogickTogle} from "../../../hooks/useLogickTogle";

interface PopUpMenuProps{
    className?:string
    Trigger:React.ReactNode
    Menu:React.ReactNode
}

const PopUpMenu:React.FC<PopUpMenuProps>=({className='',...props})=>{
    const [isOpen,toggle]=useLogickTogle()

    const divRef=React.useRef(null)

    useOutsideClick(divRef, toggle, isOpen);

    return(
        <div ref={divRef} className={className} >
            <div onClick={toggle}>
                {props.Trigger}
            </div>
            {isOpen && props.Menu}
        </div>
    )
}

export default PopUpMenu