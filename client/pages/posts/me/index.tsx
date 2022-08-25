import React from "react";
import {useAuthorize, useRedirect, useTypedDispatch, useTypedSelector} from "../../../hooks";
import {FetchMyPosts} from "../../../store/thunks/posts/";
import Title from "../../../components/seo/Title";
import Lenta from "../../../components/busines/Lenta";
import styles from '../../../styles/Me.module.scss'
import {SaveOutlined} from "@ant-design/icons";
import {LoadingButton} from "../../../components/ui";
import {UserAvatar} from "../../../components/busines";
import UsersService from "../../../services/UsersService";
import {setUser} from "../../../store/slices/authSlice";
import {useForm} from "react-hook-form";
import {UpdateUserDto} from "../../../types/dto";

const Index=()=>{

    const dispatch=useTypedDispatch()
    const {isAuth,isTryAuthorize,user}=useTypedSelector(state => state.auth)
    const {register,reset,handleSubmit}=useForm<UpdateUserDto>({mode:'onSubmit'})
    useAuthorize()
    useRedirect('/login',!isAuth, isTryAuthorize)
    React.useEffect(()=>{
        if(isAuth){
            dispatch(FetchMyPosts())
        }
    },[isAuth])

    const saveBio=async (dto:UpdateUserDto)=>{
        const newUser=await UsersService.updateUser(dto)
        dispatch(setUser(newUser.data))
        reset()
    }

    return(
        <div className={['center',styles.Me].join(' ')}>
            <Title title={'My profile'}/>
            <label htmlFor="avatarImageInput">
                <UserAvatar user={user}/>
            </label>
            <input {...register('avatarPicture',{})} className={styles.AvatarImageInput} type="file" id='avatarImageInput'/>
            <div className={styles.Bio}>
                <label>
                    About me:
                    <textarea {...register('bio',{value:user?.bio ?? '',maxLength:512})}  placeholder={'Write something...'}/>
                    <div className={styles.Save}>
                        <LoadingButton onClick={handleSubmit(saveBio)} isLoading={false}>
                            Save
                            <SaveOutlined/>
                        </LoadingButton>
                    </div>
                </label>
            </div>
            <Lenta/>
        </div>
    )
}

export default Index