import React from "react";
import styles from './FormInput.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    text:string
    registerFunc:Function
    errorMessage?:string
    isError?:boolean
}

const FormInput:React.FC<InputProps>=({text,isError,registerFunc,errorMessage,...props})=>{

    return (
           <div className={styles.InputDiv}>
               <label >{text}</label>
               <input autoComplete="off" className={[styles.Input,isError? styles.Error: styles.Good].join('  ')} {...registerFunc()} {...props}/>
               <div className={styles.Message}><span>{isError && errorMessage}</span></div>
           </div>
    )
}

export default FormInput;