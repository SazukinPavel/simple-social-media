import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UsersService } from "../../../services";

const GetUserThunk = createAsyncThunk(
  "getUserThunk",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await UsersService.getUserById(userId);
      return response.data;
    } catch (e) {
      const data = (e as AxiosError)?.response?.data as Error;
      return rejectWithValue(data.message);
    }
  }
);

export default GetUserThunk;
