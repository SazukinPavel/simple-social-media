import React from "react";
import Link from "next/link";
import styles from './Link.module.scss'

interface LinkProps{
    href:string,
    as?:string,
    children:React.ReactNode,
}

const MyLink:React.FC<LinkProps>=({children,...props})=>{
    return (
        <Link {...props}>
            <a className={styles.Link} >{children}</a>
        </Link>
    )
}

export default MyLink;