import PostsSliceState from "../states/PostsSliceState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SetPostReviewDto} from "../../types/dto";
import {
    AddPostThunk,
    DeletePostReviewThunk,
    FetchMyPosts,
    FetchPosts,
    FetchUserPosts,
    SetPostReviewThunk,
    UpdatePostThunk
} from "../thunks/posts";
import {Post, User} from "../../types";
import DeletePostThunk from "../thunks/posts/DeletePostThunk";

const initialState:PostsSliceState={posts:[]}

const postsSlice=createSlice({
    name:'posts',
    initialState,
    reducers:{
        setNewUserForAllPosts(state,action:PayloadAction<User>){
            state.posts=state.posts.map((p)=>({...p,owner:action.payload}))
        },
        addPostToPosts(state,action:PayloadAction<Post>){
            state.posts.push(action.payload)
        },
        setPostReview(state,{payload:{postId,isPositive}}:PayloadAction<SetPostReviewDto>){
            state.posts.forEach((p)=>{
                if(p._id===postId){
                    if(isPositive){
                        p.likesCount++;
                        p.dislikeCount=p.isDisliked?p.dislikeCount-1:p.dislikeCount;
                    }else {
                        p.dislikeCount++;
                        p.likesCount=p.isLiked?p.likesCount-1:p.likesCount;
                    }
                    p.isLiked=isPositive
                    p.isDisliked=!isPositive
                }
            })
        }
    },
    extraReducers:builder => {
        builder.addCase(FetchPosts.fulfilled,(state,action)=>{
            state.posts=action.payload ?? []
        })
        builder.addCase(FetchMyPosts.fulfilled,(state,action)=>{
            state.posts=action.payload ?? []
        })
        builder.addCase(FetchUserPosts.fulfilled,(state,action)=>{
            state.posts=action.payload ?? []
        })
        builder.addCase(AddPostThunk.fulfilled,(state,action)=>{
            if(action.payload){
                state.posts.push(action.payload)
            }
        })
        builder.addCase(UpdatePostThunk.fulfilled,(state,action)=>{
            state.posts=state.posts.map((p)=>{
                if(p._id===action.payload.postId){
                    p.text=action.payload.text
                }
                return p
            })
        })
        builder.addCase(SetPostReviewThunk.fulfilled,(state)=>{})
        builder.addCase(DeletePostReviewThunk.fulfilled,(state,action)=>{
            state.posts.forEach((p)=>{
                if(p._id===action.payload){
                    if(p.isLiked){
                        p.likesCount--;
                        p.isLiked=false
                    }else{
                        p.dislikeCount--;
                        p.isDisliked=false
                    }
                }
            })
        })
        builder.addCase(DeletePostThunk.fulfilled,(state,action)=>{
            state.posts=state.posts.filter(p=>p._id!==action.payload)
        })
    }
})

export const {setPostReview,setNewUserForAllPosts,addPostToPosts}=postsSlice.actions

export const postsReducer=postsSlice.reducer