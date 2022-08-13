import styles from './NotAuthorizedSection.module.scss'
import Link from "../../../ui/Link";

const NotAuthorizedSection=()=>{
    return (
        <div className={styles.NotAuthorizedSection}>
            <Link href={'/login'}>Login</Link>
            <Link href={'/register'}>Sign in</Link>
        </div>
    )
}

export default NotAuthorizedSection