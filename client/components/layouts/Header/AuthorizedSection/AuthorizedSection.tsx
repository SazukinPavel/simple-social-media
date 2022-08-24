import {User} from "../../../../types/User";
import {FC} from "react";
import styles from './AuthorizedSection.module.scss'
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {useTypedDispatch} from "../../../../hooks";
import LogoutThunk from "../../../../store/thunks/auth/LogoutThunk";
import {Link} from "../../../ui";

interface AuthorizedSectionProps{
    user:User
}

const AuthorizedSection:FC<AuthorizedSectionProps>=({user})=>{

    const dispatch=useTypedDispatch()

    const logoutClick=()=>{
        dispatch(LogoutThunk())
    }

    return (
        <div className={styles.AuthorizedSection}>
            <p>{user.username}</p>
            <Link href={'/posts/me'}>
                <UserOutlined/>
            </Link>
            <button onClick={logoutClick}>
                <LogoutOutlined/>
            </button>
        </div>
    )
}

export default AuthorizedSection