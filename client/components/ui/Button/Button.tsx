import React from "react";
import styles from './Button.module.scss'

interface ButtonProps extends  React.HTMLProps<HTMLButtonElement>{

}

const Button:React.FC<ButtonProps>=({children,...props})=>{
    return(
        <button className={styles.Button} {...props} >{children}</button>
    )
}

export default Button