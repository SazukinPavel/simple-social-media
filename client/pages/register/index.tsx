import {NextPage} from "next";
import Title from "../../components/seo/Title";
import styles from "../../styles/Register.module.scss";
import {useForm} from "react-hook-form";
import RegisterDto from "../../types/dto/Register.dto";
import {useGoBack, useLoading, useRedirect, useTypedDispatch, useTypedSelector} from "../../hooks";
import {Button, FormInput, LoadingButton} from "../../components/ui";
import {RegisterThunk} from "../../store/thunks/auth/";
import {resetError} from "../../store/slices/authSlice";
import React from "react";

const Register:NextPage=()=>{
    const {formState,reset,handleSubmit,register}=useForm<RegisterDto>({mode:'onChange'})
    const [regLoading,setRegLoading]=useLoading()
    const dispatch=useTypedDispatch()
    const {isAuth,isError,errorMessage}=useTypedSelector((state)=>state.auth)
    useRedirect('/posts',isAuth)

    const registerClick=async (dto:RegisterDto)=>{
        setRegLoading()
        await dispatch(RegisterThunk(dto))
        setRegLoading()
    }

    const goBack=useGoBack()

    React.useEffect(()=>{
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
                    <Button type={"button"}  onClick={goBack}>Back</Button>
                    <Button onClick={()=>reset()}>Reset</Button>
                    <LoadingButton isLoading={regLoading} type='submit'>Register</LoadingButton>
                </div>
            </form>
        </div>
    )
}

export default Register;