import {useEffect} from "react";
import {useRouter} from "next/router";

export const useRedirect=(path:string,...redirectOptions:boolean[])=>{

    const router=useRouter()

    useEffect(()=>{
        if(redirectOptions.filter(i=>i===true).length===redirectOptions.length){
            router.push(path)
        }
    },[...redirectOptions])
}