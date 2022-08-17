import {User} from "../../../../types/User";
import {FC} from "react";
import styles from './AuthorizedSection.module.scss'

interface AuthorizedSectionProps{
    user:User
}

const AuthorizedSection:FC<AuthorizedSectionProps>=({user})=>{
    return (
        <div className={styles.AuthorizedSection}>
            <p>{user.username}</p>
        </div>
    )
}

export default AuthorizedSection