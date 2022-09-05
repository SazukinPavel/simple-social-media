import {User} from "../../../../types/User";
import {FC} from "react";
import styles from './AuthorizedSection.module.scss'
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {useTypedDispatch} from "../../../../hooks";
import LogoutThunk from "../../../../store/thunks/auth/LogoutThunk";
import {Link, PopUpMenu} from "../../../ui";

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
            <div className={styles.UserIcon}>
            <PopUpMenu Trigger={<button><UserOutlined/></button>} Menu={
                <div className={styles.UserMenu}>
                    <Link href={'/posts/me'}>My profile</Link>
                    <Link href={'/posts'}>Posts</Link>
                    <Link href={'/users'}>Users</Link>
                </div>
            }></PopUpMenu>
            </div>
            <button className={styles.LogoutButton} onClick={logoutClick}>
                <LogoutOutlined/>
            </button>
        </div>
    )
}

export default AuthorizedSection