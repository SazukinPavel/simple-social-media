import { createSlice } from "@reduxjs/toolkit";
import UsersSliceState from "../states/UsersSliceState";
import { FetchUsersThunk } from "../thunks/users";

const initialState: UsersSliceState = { users: [] };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchUsersThunk.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const usersReducer = usersSlice.reducer;
