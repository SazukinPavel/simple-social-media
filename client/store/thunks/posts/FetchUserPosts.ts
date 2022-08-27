import {createAsyncThunk} from "@reduxjs/toolkit";
import PostsService from "../../../services/PostsService";

const FetchUserPosts=createAsyncThunk('fetchUserPosts',async (userId:string, {rejectWithValue}) => {
    try {
        console.log(userId)
        const response = await PostsService.fetchUserPosts(userId)
        return response.data
    } catch (e) {
        return rejectWithValue(e)
    }
})

export default FetchUserPosts