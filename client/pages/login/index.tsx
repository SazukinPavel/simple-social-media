import {NextPage} from "next";
import Title from "../../components/seo/Title";
import {useForm} from "react-hook-form";
import LoginDto from "../../types/dto/Login.dto";
import styles from '../../styles/Login.module.scss'
import {useTypedDispatch, useTypedSelector} from "../../hooks";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Button, FormInput, LoadingButton} from "../../components/ui";
import {LoginThunk} from "../../store/thunks/auth";
import {resetError} from "../../store/slices/authSlice";

const RegisterPage:NextPage=()=>{

    const {register,reset,formState,handleSubmit}=useForm<LoginDto>({mode:'onChange'})
    const [isLoading,setIsLoading]=useState(false)
    const {errorMessage,isError,isAuth}=useTypedSelector((state)=>state.auth)
    const router = useRouter()
    const dispatch=useTypedDispatch()

    useEffect(()=>{
        return ()=>{
            dispatch(resetError())
        }
    },[])

    const loginClick=async (dto:LoginDto)=>{
        setIsLoading(true)
        await dispatch(LoginThunk(dto))
        if(isAuth){
            router.push('/')
        }
        setTimeout(()=>{
            setIsLoading(false)

        },5000)
    }

    return(
        <div className={[styles.Login].join(' ')}>
            <Title title={'Login'}/>
            <h1>Please fill out the form</h1>
            <form onSubmit={handleSubmit(loginClick)}>
                <FormInput
                    registerFunc={()=>register('emailOrName',{
                        required:'Username or email is required field',
                        maxLength:{value:25,message:'Maximum length 25 characters'}})}
                    text={'Username or email:'}
                    placeholder={'Enter your name or email'}
                    isError={!!formState.errors.emailOrName}
                    errorMessage={formState.errors.emailOrName?.message}
                />
                <FormInput
                    type={'password'}
                    registerFunc={()=>register('password',{
                        required:'Password is required field',
                        minLength:{value:8,message:'Minimum password length 8 characters'},
                        maxLength:{value:25,message:'Maximum password length 25 characters'}})}
                    text={'Password:'}
                    placeholder={'Enter your password'}
                    isError={!!formState.errors.password}
                    errorMessage={formState.errors.password?.message}
                />
                <p>{isError && errorMessage}</p>
                <div className={styles.buttons}>
                    <Button>Back</Button>
                    <Button onClick={()=>reset()}>Reset</Button>
                    <LoadingButton isLoading={isLoading} type='submit'>Login</LoadingButton>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage;