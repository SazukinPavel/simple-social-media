import {useTypedDispatch} from "./useTypedDispatch";
import AuthService from "../services/AuthService";
import {login, setIsTryAuthorize} from "../store/slices/authSlice";
import React from "react";

export const useAuthorize=()=>{
    const dispatch=useTypedDispatch()

    React.useEffect(()=>{
        async function tryAuth(){
            try {
                const res=await AuthService.tryAuthorize()
                dispatch(login(res.data))
            } catch (e){
                dispatch(setIsTryAuthorize())
            }
        }
        tryAuth()
    },[])
}
