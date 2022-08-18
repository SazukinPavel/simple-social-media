import {User} from "../../../../types/User";
import {FC} from "react";
import styles from './AuthorizedSection.module.scss'
import {LogoutOutlined} from "@ant-design/icons";
import {useTypedDispatch} from "../../../../hooks";
import LogoutThunk from "../../../../store/thunks/auth/LogoutThunk";

interface AuthorizedSectionProps{
    user:User
}

const AuthorizedSection:FC<AuthorizedSectionProps>=({user})=>{

    const dispatch=useTypedDispatch()

    const logoutClick=()=>{
        dispatch(LogoutThunk(null))
    }

    return (
        <div className={styles.AuthorizedSection}>
            <p>{user.username}</p>
            <button onClick={logoutClick}>
                <LogoutOutlined/>
            </button>
        </div>
    )
}

export default AuthorizedSection