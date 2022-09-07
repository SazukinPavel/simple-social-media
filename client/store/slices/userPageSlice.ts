import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserPageSliceState from "../states/UserPageSliceState";
import { GetUserThunk } from "../thunks/userPage";
import { User } from "../../types";

const initialState: UserPageSliceState = { user: undefined };

const userPageSlice = createSlice({
  name: "userPage",
  initialState,
  reducers: {
    resetUser(state) {
      state.user = undefined;
    },
    setUserPageUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetUserThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { resetUser, setUserPageUser } = userPageSlice.actions;

export const userPageReducer = userPageSlice.reducer;
