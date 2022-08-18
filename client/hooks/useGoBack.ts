import {useRouter} from "next/router";

export const useGoBack=()=>{
    const router=useRouter()
    return()=>{
        router.back()
    }
}