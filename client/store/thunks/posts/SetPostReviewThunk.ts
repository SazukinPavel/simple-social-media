import {createAsyncThunk} from "@reduxjs/toolkit";
import PostsService from "../../../services/PostsService";
import SetPostReviewDto from "../../../types/dto/SetPostReview.dto";

const SetPostReviewThunk=createAsyncThunk('setPostReviewThunk',async (dto:SetPostReviewDto, {}) => {
    try {
        const response = await PostsService.setPostReview(dto)
        return response.data
    } catch (e) {
    }
})

export default SetPostReviewThunk