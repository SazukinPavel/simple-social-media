import {createAsyncThunk} from "@reduxjs/toolkit";
import LoginDto from "../../../types/dto/Login.dto";
import AuthService from "../../../services/AuthService";
import {AxiosError} from "axios";

const loginThunk=createAsyncThunk('loginThunk',async (dto:LoginDto,{rejectWithValue})=>{
    try{
        const response=await AuthService.login(dto)
        return response.data
    }catch (e){
        const data=(e as AxiosError)?.response?.data as Error
        return rejectWithValue(data.message);
    }
})

export default loginThunk
