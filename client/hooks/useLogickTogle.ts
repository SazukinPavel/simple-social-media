import React from "react";

export const useLogickTogle=(initValue=false)=>{
    return React.useReducer((isToggle:boolean)=>!isToggle,initValue)
}