import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostsService } from "../../../services";
import UpdatePostDto from "../../../types/dto/UpdatePost.dto";

const UpdatePostThunk = createAsyncThunk(
  "updatePostThunk",
  async (dto: UpdatePostDto, { rejectWithValue }) => {
    try {
      const data = await PostsService.updatePost(dto);
      return dto;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export default UpdatePostThunk;
