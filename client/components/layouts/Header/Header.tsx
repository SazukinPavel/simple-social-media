import styles from './Header.module.scss'
import Link from "next/link";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import AuthorizedSection from "./AuthorizedSection";
import NotAuthorizedSection from "./NotAuthorizedSection";

const Header=()=>{

    const {isAuth,user}=useTypedSelector(state=>state.auth)

    console.log(user)

    return(
        <header className={styles.Header}>
            <div className={styles.Logo}>
                <Link href={'/'}><a>Simple Social Network</a></Link>
            </div>
            {isAuth && user?<AuthorizedSection user={user}/>:<NotAuthorizedSection/>}
        </header>
    )
}

export default Header;