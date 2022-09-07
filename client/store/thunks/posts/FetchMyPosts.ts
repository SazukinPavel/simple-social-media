import { createAsyncThunk } from "@reduxjs/toolkit";
import PostsService from "../../../services/PostsService";

const FetchMyPosts = createAsyncThunk(
  "fetchMyPosts",
  async (d, { rejectWithValue }) => {
    try {
      const response = await PostsService.fetchMyPosts();
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export default FetchMyPosts;
