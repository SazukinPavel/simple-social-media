import {useEffect} from "react";
import {useTypedDispatch} from "./useTypedDispatch";
import AuthService from "../services/AuthService";
import {login} from "../store/slices/authSlice";

export const useAuthorize=()=>{
    const dispatch=useTypedDispatch()

    useEffect(()=>{
        async function tryAuth(){
            try {
                const res=await AuthService.tryAuthorize()
                dispatch(login(res.data))
            } catch (e){}
        }
        tryAuth()
    },[])
}
