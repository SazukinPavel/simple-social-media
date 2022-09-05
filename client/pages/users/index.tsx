import { NextPage } from "next";
import React from "react";
import { UsersList } from "../../components/busines";
import Title from "../../components/seo/Title";
import { useTypedDispatch, useTypedSelector } from "../../hooks";
import { FetchUsersThunk } from "../../store/thunks/users";
import styles from '../../styles/Users.module.scss'

const UsersPage:NextPage=()=>{

    const {users}=useTypedSelector(state=>state.users)
    const dispatch=useTypedDispatch()


    React.useEffect(()=>{
        dispatch(FetchUsersThunk())
    },[])

    return(
        <>
            <Title>Users</Title>
            <div className={["center",styles.Users].join(' ')}>
                <h1>All users:</h1>
                <UsersList users={users}/>
            </div>
        </>
    )
}

export default UsersPage