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

const Index=()=>{

    const dispatch=useTypedDispatch()
    const {isAuth,isTryAuthorize,user}=useTypedSelector(state => state.auth)
    const [bio,setBio]=React.useState(user?.bio)
    useAuthorize()
    useRedirect('/login',!isAuth, isTryAuthorize)
    React.useEffect(()=>{
        if(isAuth){
            dispatch(FetchMyPosts())
        }
    },[isAuth])

    const saveBio=async ()=>{
        const newUser=await UsersService.updateUser({bio:bio??''})
        dispatch(setUser(newUser.data))
    }

    const bioChange=(e:any)=>{
        setBio(e.target?.value ??'')
    }

    return(
        <div className={['center',styles.Me].join(' ')}>
            <Title title={'My profile'}/>
            <UserAvatar user={user}/>
            <div className={styles.Bio}>
                <label>
                    About me:
                    <textarea onChange={bioChange} maxLength={512} placeholder={'Write something...'} value={user?.bio ?? ''}/>
                    <div className={styles.Save}>
                        <LoadingButton onClick={saveBio} isLoading={false}>
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