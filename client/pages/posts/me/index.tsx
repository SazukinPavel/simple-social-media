import React from "react";
import {useAuthorize, useLoading, useRedirect, useTypedDispatch, useTypedSelector} from "../../../hooks";
import {FetchMyPosts} from "../../../store/thunks/posts/";
import Title from "../../../components/seo/Title";
import styles from '../../../styles/Me.module.scss'
import {SaveOutlined} from "@ant-design/icons";
import {LoadingButton} from "../../../components/ui";
import {UserAvatar,Lenta} from "../../../components/busines";
import UsersService from "../../../services/UsersService";
import {setUser} from "../../../store/slices/authSlice";
import {useForm} from "react-hook-form";
import {UpdateUserDto} from "../../../types/dto";
import {setNewUserForAllPosts} from "../../../store/slices/postsSlice";
import {User} from "../../../types";

const Index=()=>{

    const dispatch=useTypedDispatch()
    const {isAuth,isTryAuthorize,user}=useTypedSelector(state => state.auth)
    const {register,reset,handleSubmit}=useForm<UpdateUserDto>({mode:'onSubmit'})
    const [saveLoading,switchSaveLoading]=useLoading()
    useRedirect('/login',!isAuth, isTryAuthorize)
    React.useEffect(()=>{
        if(isAuth){
            dispatch(FetchMyPosts())
        }
    },[isAuth])

    const saveBio=async (dto:UpdateUserDto)=>{
        switchSaveLoading()
        const newUser=await UsersService.updateUser(dto)
        dispatch(setUser(newUser.data))
        switchSaveLoading()
        reset()
    }

    React.useEffect(()=>{
        dispatch(setNewUserForAllPosts(user as User))
    },[user])

    return(
        <>
            <Title>My profile</Title>
            <div className={['center',styles.Me].join(' ')}>
                <label htmlFor="avatarImageInput">
                    <UserAvatar user={user}/>
                </label>
                <input {...register('avatarPicture',{})} className={styles.AvatarImageInput} type="file" id='avatarImageInput'/>
                <div className={styles.Bio}>
                    <label>
                        About me:
                        {user?.bio && <textarea {...register('bio',{value:user?.bio,maxLength:512})} placeholder={'Write something...'}/>}
                        <div className={styles.Save}>
                            <LoadingButton styleType={'black'} onClick={handleSubmit(saveBio)} isLoading={saveLoading}>
                                Save
                                <SaveOutlined/>
                            </LoadingButton>
                        </div>
                    </label>
                </div>
                <Lenta/>
            </div>
        </>
    )
}

export default Index