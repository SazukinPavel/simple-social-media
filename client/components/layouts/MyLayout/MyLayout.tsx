import Header from "../Header";
import {NextPage} from "next";
import React from "react";
import Head from "next/head";
import Footer from "../Footer";
import styles from './MyLayout.module.scss'
interface MyLayoutProps{
    children:React.ReactNode
}

const MyLayout:NextPage<MyLayoutProps>=({children})=>{

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