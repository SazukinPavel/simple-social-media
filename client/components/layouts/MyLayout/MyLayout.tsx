import Header from "../Header";
import {NextPage} from "next";
import React, {useEffect} from "react";
import Head from "next/head";
import Footer from "../Footer";
import {useTypedDispatch} from "../../../hooks";
import AuthService from "../../../services/AuthService";
import {login} from "../../../store/slices/authSlice";
import styles from './MyLayout.module.scss'
interface MyLayoutProps{
    children:React.ReactNode
}

const MyLayout:NextPage<MyLayoutProps>=({children})=>{

    const dispatch=useTypedDispatch()

    useEffect(()=>{
        async function tryAuth(){
            try {
                const res=await AuthService.tryAuthorize()
                console.log(res)
                dispatch(login(res.data))
            } catch (e){}
        }
        tryAuth()
    },[])

    return (
        <div className={styles.wrapper}>
            <Head>
            </Head>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default MyLayout;