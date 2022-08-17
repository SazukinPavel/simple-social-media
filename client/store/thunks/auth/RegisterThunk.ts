import {createAsyncThunk} from "@reduxjs/toolkit";
import RegisterDto from "../../../types/dto/Register.dto";
import AuthService from "../../../services/AuthService";
import {AxiosError} from "axios";

const registerThunk=createAsyncThunk('registerThunk',async (dto:RegisterDto,{rejectWithValue})=>{
    try{
        const response=await AuthService.register(dto)
        return response.data
    }catch (e){
        const data=(e as AxiosError)?.response?.data as Error
        return rejectWithValue(data.message);
    }
})

export default registerThunk