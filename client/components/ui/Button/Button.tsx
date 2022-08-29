import React from "react";
import styles from './Button.module.scss'

export interface ButtonProps extends  React.HTMLProps<HTMLButtonElement>{
    styleType?:'blue' | 'black'
}

const Button:React.FC<ButtonProps>=({children,styleType='blue',...props})=>{
    return(
        <button className={[styles.Button,styles[styleType]].join(' ')} {...props} >{children}</button>
    )
}

export default Button