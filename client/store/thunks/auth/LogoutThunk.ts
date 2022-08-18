import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "../../../services/AuthService";

export const loginThunk=createAsyncThunk<Promise<void>,null>('logoutThunk',async (d)=>{
    try{
        const response=await AuthService.logout()
    }catch (e){
    }
})

export default loginThunk
