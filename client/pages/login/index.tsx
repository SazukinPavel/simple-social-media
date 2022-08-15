import {NextPage} from "next";
import Title from "../../components/seo/Title";
import FormInput from "../../components/ui/FormInput";
import {useForm} from "react-hook-form";
import LoginDto from "../../types/dto/Login.dto";
import styles from '../../styles/Login.module.scss'
import Button from "../../components/ui/Button/Button";
import {useTypedDispatch, useTypedSelector} from "../../hooks";
import {useState} from "react";
import {loginThunk} from "../../store/slices/authSlice";
import {useRouter} from "next/router";

const Login:NextPage=()=>{

    const {register,reset,formState,handleSubmit}=useForm<LoginDto>({mode:'onChange'})
    const [isLoading,setIsLoading]=useState(false)
    const {errorMessage,isError,isAuth}=useTypedSelector((state)=>state.auth)
    const router = useRouter()
    const dispatch=useTypedDispatch()

    const loginClick=async (dto:LoginDto)=>{
        setIsLoading(true)
        await dispatch(loginThunk(dto))
        if(isAuth){
            router.push('/')
        }
        setIsLoading(false)
    }

    return(
        <div className={[styles.Login].join(' ')}>
            <Title title={'Login'}/>
            {isLoading && <h1>Loading</h1>}
            <h1>Please fill out the form</h1>
            <h3>{isError && errorMessage}</h3>
            <form onSubmit={handleSubmit(loginClick)}>
                <FormInput
                    registerFunc={()=>register('nameOrEmail',{
                        required:'Username or email is required field',
                        maxLength:{value:25,message:'Maximum length 25 characters'}})}
                    text={'Username or email:'}
                    placeholder={'Enter your name or email'}
                    isError={!!formState.errors.nameOrEmail}
                    errorMessage={formState.errors.nameOrEmail?.message}
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
                <div className={styles.buttons}>
                    <Button>Back</Button>
                    <Button onClick={()=>reset()}>Reset</Button>
                    <Button type='submit'>Login</Button>
                </div>
            </form>
        </div>
    )
}

export default Login;