import React from "react";
import Post from "../../../types/Post";

const PostCard:React.FC<Post>=({text,likesCount,pictureName,owner})=>{
    return(
        <div>
            <img src={'https://pngtree.com/freepng/pink-cube_4611868.html'}/>
            <p>
                <span>{owner.username}</span>
                <span>{text}</span>
                <span>{likesCount}</span>
            </p>
        </div>
    )
}

export default PostCard