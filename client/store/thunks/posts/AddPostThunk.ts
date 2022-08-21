import {createAsyncThunk} from "@reduxjs/toolkit";
import AddPostDto from "../../../types/dto/AddPost.dto";
import PostsService from "../../../services/PostsService";

export const addPost=createAsyncThunk('addPost',async (dto:AddPostDto)=>{
    try {
        const response=await PostsService.createPost(dto)
        return response.data
    }catch (e){}
})

export default addPost