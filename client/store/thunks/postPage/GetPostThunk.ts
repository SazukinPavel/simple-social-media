import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostsService } from "../../../services";

const GetPostThunk = createAsyncThunk(
  "getPostThunk",
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await PostsService.findById(postId);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export default GetPostThunk;
