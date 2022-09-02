import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PostPageSliceState} from "../states/PostPageSliceState";
import {GetPostThunk} from "../thunks/postPage";
import {Post} from "../../types";

const initialState:PostPageSliceState={post:undefined}


const postPageSlice=createSlice({
    name:'postPage',
    initialState,
    reducers:{
        resetPost(state){
         state.post=undefined
        },
        setPostPage(state,action:PayloadAction<Post>){
          state.post=action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetPostThunk.fulfilled,(state,action)=>{
            state.post=action.payload
        })
    }
})

export const {resetPost,setPostPage}=postPageSlice.actions

export const postPageReducer=postPageSlice.reducer