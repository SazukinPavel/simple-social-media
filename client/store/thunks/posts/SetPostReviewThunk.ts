import {createAsyncThunk} from "@reduxjs/toolkit";
import PostsService from "../../../services/PostsService";
import SetPostReviewDto from "../../../types/dto/SetPostReview.dto";
import {setPostReview} from "../../slices/postsSlice";

const SetPostReviewThunk=createAsyncThunk('setPostReviewThunk',async (dto:SetPostReviewDto, {rejectWithValue,dispatch}) => {
    try {
        const response = await PostsService.setPostReview(dto)
        if(response.data.isSet){
            dispatch(setPostReview(dto))
        }
    } catch (e) {
        return rejectWithValue(e)
    }
})

export default SetPostReviewThunk