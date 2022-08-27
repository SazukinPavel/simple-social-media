import React from "react";

export const useLoading=(initLoading=false)=>{
    return React.useReducer((isLoading:boolean)=>!isLoading,initLoading)
}