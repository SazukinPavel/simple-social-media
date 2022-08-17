import {User} from "../../../../types/User";
import {FC} from "react";

interface AuthorizedSectionProps{
    user:User
}

const AuthorizedSection:FC<AuthorizedSectionProps>=({user})=>{
    return (
        <div>
            <p>{user.username}</p>
        </div>
    )
}

export default AuthorizedSection