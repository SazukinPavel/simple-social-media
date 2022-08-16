import {createSlice, PayloadAction,createAsyncThunk} from "@reduxjs/toolkit";
import AuthSliceState from "../states/AuthSliceState";
import LoginDto from "../../types/dto/Login.dto";
import AuthDto from "../../types/dto/Auth.dto";
import AuthService from "../../services/AuthService";
import RegisterDto from "../../types/dto/Register.dto";
import {AxiosError} from "axios";
import {WritableDraft} from "immer/dist/types/types-external";

const initialState:AuthSliceState={isAuth:false,user:null,accessToken:null,errorMessage:null,isError:false}

export const loginThunk=createAsyncThunk('loginThunk',async (dto:LoginDto,{rejectWithValue})=>{
    try{
        const response=await AuthService.login(dto)
        return response.data
    }catch (e){
        const data=(e as AxiosError)?.response?.data as Error
        return rejectWithValue(data.message);
    }
})

export const registerThunk=createAsyncThunk('registerThunk',async (dto:RegisterDto,{rejectWithValue})=>{
    try{
        const response=await AuthService.register(dto)
        return response.data
    }catch (e){
        const data=(e as AxiosError)?.response?.data as Error
        return rejectWithValue(data.message);
    }
})

const loginFunc=(state:WritableDraft<AuthSliceState>,authDto:AuthDto)=>{
    resetErrorFunc(state);
    state.isAuth=true
    state.accessToken=authDto.accessToken
    state.user=authDto.user
}

const resetErrorFunc=(state:WritableDraft<AuthSliceState>)=>{
    state.isError=false
    state.errorMessage=null
}

const setError=(state:WritableDraft<AuthSliceState>,message?:string)=>{
    state.isError=true
    state.errorMessage=message ?? ''
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action:PayloadAction<AuthDto>){
            loginFunc(state,action.payload)
        },
        logout(state){
            state=initialState
        },
        resetError(state){
            resetErrorFunc(state)
        }
    },

    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (state,action)=>{
            loginFunc(state,action.payload)
        })
        builder.addCase(registerThunk.fulfilled, (state,action)=>{
            loginFunc(state,action.payload)
        })
        builder.addCase(loginThunk.rejected, (state,action)=>{
            setError(state,action.payload as string)
        })
        builder.addCase(registerThunk.rejected, (state,action)=>{
            setError(state,action.payload as string)
        })
    }
})

export const {login,logout,resetError}=authSlice.actions

export const authReducer=authSlice.reducer