import {NextPage} from "next";
import Title from "../../components/seo/Title";
import styles from "../../styles/Register.module.scss";
import FormInput from "../../components/ui/FormInput";
import Button from "../../components/ui/Button/Button";
import {useForm} from "react-hook-form";
import RegisterDto from "../../types/dto/Register.dto";

const Register:NextPage=()=>{
    const {formState,reset,handleSubmit,register}=useForm<RegisterDto>({mode:'onChange'})
    const registerClick=()=>{

    }

    return(
        <div className={[styles.Register].join(' ')}>
            <Title title={'Sign in'}/>
            <h1>Please fill out the form</h1>
            <form onSubmit={handleSubmit(registerClick)}>
                <FormInput
                    registerFunc={()=>register('name',{
                        required:'Username is required field',
                        maxLength:{value:25,message:'Maximum username length 25 characters'}})}
                    text={'Username:'}
                    placeholder={'Enter your name'}
                    isError={!!formState.errors.name}
                    errorMessage={formState.errors.name?.message}
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
                <div className={styles.buttons}>
                    <Button>Back</Button>
                    <Button onClick={()=>reset()}>Reset</Button>
                    <Button type='submit'>Register</Button>
                </div>
            </form>
        </div>
    )
}

export default Register;