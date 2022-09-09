import styles from './EmptyComments.module.scss'

const EmptyComments=()=>{
    return(
        <div className={styles.EmptyComments}>
            <span>
                Oppps...
            </span>
            <p>
                Sorry no one left a comment on this post
            </p>
        </div>
    )
}

export default EmptyComments