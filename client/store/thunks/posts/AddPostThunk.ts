import {createAsyncThunk} from "@reduxjs/toolkit";
import AddPostDto from "../../../types/dto/AddPost.dto";
import PostsService from "../../../services/PostsService";

const AddPostThunk=createAsyncThunk('addPost',async (dto:AddPostDto,{rejectWithValue})=>{
    try {
        const response=await PostsService.createPost(dto)
        return response.data
    }catch (e){
        return rejectWithValue('Some error')
    }
})

export default AddPostThunk