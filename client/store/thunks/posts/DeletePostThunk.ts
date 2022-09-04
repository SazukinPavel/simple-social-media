import {createAsyncThunk} from "@reduxjs/toolkit";
import PostsService from "../../../services/PostsService";

const DeletePostThunk=createAsyncThunk('deletePostThunk',async (id:string, {rejectWithValue}) => {
    try {
        const response = await PostsService.deletePost(id)
        return id
    } catch (e) {
        return rejectWithValue(e)
    }
})

export default DeletePostThunk