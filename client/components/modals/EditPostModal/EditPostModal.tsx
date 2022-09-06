import {ModalWindow} from "../../ui";
import React from "react";
import {ModalWindowProps} from "../../ui/ModalWindow/ModalWindow";



const EditPostModal:React.FC<ModalWindowProps>=(props)=>{
    return(
        <ModalWindow {...props}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias consectetur, deserunt eligendi fuga ipsum maiores natus optio placeat quas totam.
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias aliquam, consequuntur cumque enim est inventore modi non placeat voluptatum?</p>
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum et hic iste laboriosam pariatur praesentium quae reiciendis soluta totam.</span>
        </ModalWindow>
    )
}

export default EditPostModal