import {NextPage} from "next";
import Title from "../../components/seo/Title";
import styles from "../../styles/Register.module.scss";
import {useForm} from "react-hook-form";
import RegisterDto from "../../types/dto/Register.dto";
import {useEffect, useState} from "react";
import {useTypedDispatch, useTypedSelector} from "../../hooks";
import {Button, FormInput, LoadingButton} from "../../components/ui";
import {useRouter} from "next/router";
import {RegisterThunk} from "../../store/thunks/auth/";
import {resetError} from "../../store/slices/authSlice";

const Register:NextPage=()=>{
    const {formState,reset,handleSubmit,register}=useForm<RegisterDto>({mode:'onChange'})
    const [isLoading,setIsLoading]=useState(false)
    const dispatch=useTypedDispatch()
    const {isAuth,isError,errorMessage}=useTypedSelector((state)=>state.auth)
    const router=useRouter()

    const registerClick=async (dto:RegisterDto)=>{
        setIsLoading(true)
        await dispatch(RegisterThunk(dto))
        if(isAuth){
            router.push('/')
        }
        setTimeout(()=>{
            setIsLoading(false)
        },5000)
    }

    useEffect(()=>{
        return ()=>{
            dispatch(resetError())
        }
    },[])

    return(
        <div className={[styles.Register].join(' ')}>
            <Title title={'Sign in'}/>
            <h1>Please fill out the form</h1>
            <form onSubmit={handleSubmit(registerClick)}>
                <FormInput
                    registerFunc={()=>register('username',{
                        required:'Username is required field',
                        maxLength:{value:25,message:'Maximum username length 25 characters'}})}
                    text={'Username:'}
                    placeholder={'Enter your name'}
                    isError={!!formState.errors.username}
                    errorMessage={formState.errors.username?.message}
                />
                <FormInput
                    type={'email'}
                    registerFunc={()=>register('email',{
                        required:'Email is required field'})}
                    text={'Email:'}
                    placeholder={'Enter your email'}
                    isError={!!formState.errors.email}
                    errorMessage={formState.errors.email?.message}
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
                    <LoadingButton isLoading={isLoading} type='submit'>Register</LoadingButton>
                </div>
            </form>
        </div>
    )
}

export default Register;