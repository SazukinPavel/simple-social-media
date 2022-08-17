import PostsSliceState from "../states/PostsSliceState";
import {createSlice} from "@reduxjs/toolkit";
import {AddPostThunk, FetchPosts} from "../thunks/posts/";

const initialState:PostsSliceState={posts:[]}

const postsSlice=createSlice({
    name:'posts',
    initialState,
    reducers:{
    },
    extraReducers:builder => {
        builder.addCase(FetchPosts.fulfilled,(state,action)=>{
            state.posts=action.payload ?? []
        })
        builder.addCase(AddPostThunk.fulfilled,(state,action)=>{
            console.log(action.payload)
            if(action.payload){
                state.posts.push(action.payload)
            }
        })
    }
})

export const postsReducer=postsSlice.reducer