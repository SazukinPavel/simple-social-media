import {createAsyncThunk} from "@reduxjs/toolkit";
import PostsService from "../../../services/PostsService";

const DeletePostReviewThunk=createAsyncThunk('deletePostReviewThunk',async (id:string, {}) => {
    try {
        const response = await PostsService.deletePostReview(id)
        return id
    } catch (e) {
    }
})

export default DeletePostReviewThunk