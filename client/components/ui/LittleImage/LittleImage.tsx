import React from "react"
import styles from './LittleImage.module.scss'

interface LittleImageProps{
    src:string
}

const LittleImage:React.FC<LittleImageProps>=({src})=>{
    return(
        <div className={styles.LittleImage}>
            <img src={src}/>
        </div>
    )
}

export default LittleImage