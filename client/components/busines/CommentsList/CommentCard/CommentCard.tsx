import React from "react"
import { AvatarImage } from "../../../ui"
import {Comment} from '../../../../types/'

interface CommentCardProps{
    comment:Comment
}

const CommentCard:React.FC<CommentCardProps>=({comment:{owner,post,text}})=>{

    return (
        <div>
            <div>
                <AvatarImage pictureName={owner.avatarPicture}/>
                <p>{owner.username}</p>
            </div>
            <p>{text}</p>
        </div>
    )
}

export default CommentCard