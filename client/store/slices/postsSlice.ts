import PostsSliceState from "../states/PostsSliceState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AddPostThunk, FetchPosts} from "../thunks/posts/";
import {DeletePostReviewThunk, SetPostReviewThunk} from "../thunks/posts";
import {PostReview} from "../../types/PostReview";

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
            if(action.payload){
                state.posts.push(action.payload)
            }
        })
        builder.addCase(SetPostReviewThunk.fulfilled,(state,action:PayloadAction<PostReview>)=>{
            state.posts.forEach((p)=>{
                if(p._id===action.payload.post._id){
                    p.isLiked=action.payload.isPositive
                    p.isDisliked=!action.payload.isPositive
                }
            })
        })
        builder.addCase(DeletePostReviewThunk.fulfilled,(state,action)=>{
            state.posts.forEach((p)=>{
                if(p._id===action.payload){
                    p.isLiked=false
                    p.isDisliked=false
                }
            })
        })
    }
})

export const postsReducer=postsSlice.reducer