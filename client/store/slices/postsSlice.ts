import PostsSliceState from "../states/PostsSliceState";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import PostsService from "../../services/PostsService";

const initialState:PostsSliceState={posts:[]}

export const fetchPosts=createAsyncThunk('fetchPosts',async (d, {rejectWithValue}) => {
    try {
        const response = await PostsService.fetchPosts()
        return response.data
    } catch (e) {
    }
})

const postsSlice=createSlice({
    name:'posts',
    initialState,
    reducers:{
    },
    extraReducers:builder => {
        builder.addCase(fetchPosts.fulfilled,(state,action)=>{
            state.posts=action.payload ?? []
        })
    }
})

export const postsReducer=postsSlice.reducer