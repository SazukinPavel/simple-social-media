import {User} from "../../types/User";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthDto} from "../../types/dto/Auth.dto";
import AuthSliceState from "../states/authSliceState";

const initialState:AuthSliceState={isAuth:false,user:null,accessToken:null}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action:PayloadAction<AuthDto>){
            state.isAuth=true
            state.accessToken=action.payload.accessToken
            state.user=action.payload.user
        },
        logout(state){
            state=initialState
        }
    }
})

export const {login,logout}=authSlice.actions

export const authReducer=authSlice.reducer