import React from "react";
import {useLogickTogle} from "./useLogickTogle";

export const useLoading=(initLoading=false)=>{
    return useLogickTogle(initLoading)
}