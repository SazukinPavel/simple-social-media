import Image, { ImageLoader } from "next/image"
import React from "react"
import styles from './LittleImage.module.scss'

interface LittleImageProps{
    loader:ImageLoader
    src:string
}

const LittleImage:React.FC<LittleImageProps>=({...props})=>{
    return(
        <div className={styles.LittleImage}>
            <Image  {...props} unoptimized={true} width="100%" height="100%" layout="responsive" />
        </div>
    )
}

export default LittleImage