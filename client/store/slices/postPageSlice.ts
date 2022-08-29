import {createSlice} from "@reduxjs/toolkit";
import {PostPageSliceState} from "../states/PostPageSliceState";
import {GetPostThunk} from "../thunks/postPage";

const initialState:PostPageSliceState={post:undefined,isPostNotExist:false}


const postPageSlice=createSlice({
    name:'postPage',
    initialState,
    reducers:{
        resetPost(state){
         state.post=undefined
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetPostThunk.fulfilled,(state,action)=>{
            state.isPostNotExist=false
            state.post=action.payload
        })
        builder.addCase(GetPostThunk.rejected,(state)=>{
            state.isPostNotExist=true
        })
    }
})

export const {resetPost}=postPageSlice.actions

export const postPageReducer=postPageSlice.reducer