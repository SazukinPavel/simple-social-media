import {createSlice} from "@reduxjs/toolkit";
import UserPageSliceState from "../states/UserPageSliceState";
import {GetUserThunk} from "../thunks/userPage";

const initialState:UserPageSliceState={user:undefined,isUserNotExist:false}

const userPageSlice=createSlice({
    name:'userPage',
    initialState,
    reducers:{
    },
    extraReducers:builder => {
        builder.addCase(GetUserThunk.fulfilled,(state, action)=>{
            state.isUserNotExist=false
            state.user=action.payload
        })
        builder.addCase(GetUserThunk.rejected,(state)=>{
            state.isUserNotExist=true
        })
    }
})

export const userPageReducer=userPageSlice.reducer