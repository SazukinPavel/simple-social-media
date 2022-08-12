import Head from "next/head";
import {FC} from "react";

interface TitleProps{
    title:string
}

const Title:FC<TitleProps>=({title})=>{
    return(
        <Head>
            <title>{title} | Simple Social Media</title>
        </Head>
    )
}

export default Title;