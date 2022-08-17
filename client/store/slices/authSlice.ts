import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import AuthSliceState from "../states/AuthSliceState";
import AuthDto from "../../types/dto/Auth.dto";
import {WritableDraft} from "immer/dist/types/types-external";
import {LoginThunk,RegisterThunk} from "../thunks/auth/";

const initialState:AuthSliceState={isAuth:false,user:null,accessToken:null,errorMessage:null,isError:false}

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
    }
})

export const {login,logout,resetError}=authSlice.actions

export const authReducer=authSlice.reducer