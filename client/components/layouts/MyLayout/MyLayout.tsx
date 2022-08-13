import Header from "../Header";
import {NextPage} from "next";
import React from "react";
import Head from "next/head";
import Footer from "../Footer";

interface MyLayoutProps{
    children:React.ReactNode
}

const MyLayout:NextPage<MyLayoutProps>=({children})=>{
    return (
        <>
            <Head>
            </Head>
            <Header/>
            <main>
                {children}
            </main>
        </>
    )
}

export default MyLayout;