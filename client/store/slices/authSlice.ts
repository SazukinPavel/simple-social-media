import {createSlice, PayloadAction,createAsyncThunk} from "@reduxjs/toolkit";
import AuthSliceState from "../states/authSliceState";
import LoginDto from "../../types/dto/Login.dto";
import AuthDto from "../../types/dto/Auth.dto";
import AuthService from "../../services/AuthService";
import RegisterDto from "../../types/dto/Register.dto";
import {AxiosError} from "axios";

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
        return rejectWithValue((e as Error).message)
    }
})

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action:PayloadAction<AuthDto>){
            this.resetError(state)
            state.isAuth=true
            state.accessToken=action.payload.accessToken
            state.user=action.payload.user
        },
        logout(state){
            state=initialState
        },
        setError(state,action:PayloadAction<string | undefined>){
            console.log(action)
            state.isError=true
            state.errorMessage=action.payload ?? 'Произошла ощибка попробуйте ещё раз';
        },
        resetError(state){
            state.isError=false
            state.errorMessage=null
        }
    },

    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (state,action)=>{login(action.payload)})
        builder.addCase(registerThunk.fulfilled, (state,action)=>{login(action.payload)})
        builder.addCase(loginThunk.rejected, (state,action)=>{setError(action.payload as string) })
        builder.addCase(registerThunk.rejected, (state,action)=>{setError(action.error.message)})
    }
})

export const {login,logout,setError,resetError}=authSlice.actions

export const authReducer=authSlice.reducer