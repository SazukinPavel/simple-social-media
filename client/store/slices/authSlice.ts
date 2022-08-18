import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import AuthSliceState from "../states/AuthSliceState";
import AuthDto from "../../types/dto/Auth.dto";
import {WritableDraft} from "immer/dist/types/types-external";
import {LoginThunk,RegisterThunk} from "../thunks/auth/";
import LogoutThunk from "../thunks/auth/LogoutThunk";

const initialState:AuthSliceState={isAuth:false,user:null,accessToken:null,errorMessage:null,isError:false,isTryAuthorize:false}

const loginFunc=(state:WritableDraft<AuthSliceState>,authDto:AuthDto)=>{
    resetErrorFunc(state);
    state.isAuth=true
    state.accessToken=authDto.accessToken
    state.user=authDto.user
    state.isTryAuthorize=true
}

const resetErrorFunc=(state:WritableDraft<AuthSliceState>)=>{
    state.isError=false
    state.errorMessage=null
}

const setError=(state:WritableDraft<AuthSliceState>,message?:string)=>{
    state.isError=true
    state.errorMessage=message ?? ''
    state.isTryAuthorize=true
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action:PayloadAction<AuthDto>){
            loginFunc(state,action.payload)
        },
        resetError(state){
            resetErrorFunc(state)
        }
    },

    extraReducers: (builder) => {
        builder.addCase(LoginThunk.fulfilled, (state,action)=>{
            loginFunc(state,action.payload)
        })
        builder.addCase(RegisterThunk.fulfilled, (state,action)=>{
            loginFunc(state,action.payload)
        })
        builder.addCase(LoginThunk.rejected, (state,action)=>{
            setError(state,action.payload as string)
        })
        builder.addCase(RegisterThunk.rejected, (state,action)=>{
            setError(state,action.payload as string)
        })
        builder.addCase(LogoutThunk.fulfilled,state => {
            resetErrorFunc(state)
            state.isAuth=false
            state.user=null
        })
    }
})

export const {login,resetError}=authSlice.actions

export const authReducer=authSlice.reducer