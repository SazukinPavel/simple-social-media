import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "../../../services/AuthService";

const LogoutThunk=createAsyncThunk('logoutThunk',async (d,{rejectWithValue})=>{
    try{
        const response=await AuthService.logout()
    }catch (e){
        return rejectWithValue(e)
    }
})

export default LogoutThunk
