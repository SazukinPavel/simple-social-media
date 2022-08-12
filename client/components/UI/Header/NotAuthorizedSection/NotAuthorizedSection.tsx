import styles from './NotAuthorizedSection.module.scss'
import Link from "../../Link";

const NotAuthorizedSection=()=>{
    return (
        <div className={styles.NotAuthorizedSection}>
            <Link href={'/login'}>Login</Link>
            <Link href={'/signin'}>Sign in</Link>
        </div>
    )
}

export default NotAuthorizedSection