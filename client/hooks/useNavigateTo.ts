import {useRouter} from "next/router";

export const useNavigateTo=(to:string)=>{
    const router=useRouter()

    return ()=>router.push(to)
}