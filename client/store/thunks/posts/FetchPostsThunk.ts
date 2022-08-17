import {createAsyncThunk} from "@reduxjs/toolkit";
import PostsService from "../../../services/PostsService";

const fetchPosts=createAsyncThunk('fetchPosts',async (d, {rejectWithValue}) => {
    try {
        const response = await PostsService.fetchPosts()
        return response.data
    } catch (e) {
    }
})

export default fetchPosts