import React from "react";
import styles from './LoadingButton.module.scss'
import buttonStyles from '../Button/Button.module.scss'

interface LoadingButtonProps extends React.HTMLProps<HTMLButtonElement>{
    isLoading:boolean
}

const LoadingButton:React.FC<LoadingButtonProps>=({isLoading,children,...props})=>{
    return(
        <button className={[buttonStyles.Button,styles.Button].join(' ')} {...props}>
            <div className={isLoading?styles.Centre:''}>
                {isLoading && <div className={styles.Loading}></div>}
                <span className={isLoading?styles.Hide:''}>{children}</span>
            </div>
        </button>
    )
}

export default LoadingButton