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

    const buttonRef=React.useRef(null)

    useOutsideClick(buttonRef, toggle, isOpen);

    return(
        <div ref={buttonRef} className={className} >
            <div onClick={toggle}>
                {props.Trigger}
            </div>
            {isOpen && props.Menu}
        </div>
    )
}


//PopUpMenu.Trigger = PopUpMenuTrigger;
//PopUpMenu.Menu=PopUpMenuMenu;

export default PopUpMenu