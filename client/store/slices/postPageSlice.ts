import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostPageSliceState } from "../states/PostPageSliceState";
import { GetPostThunk } from "../thunks/postPage";
import { Post } from "../../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState: PostPageSliceState = { post: null };

const postPageSlice = createSlice({
  name: "postPage",
  initialState,
  reducers: {
    resetPost(state) {
      state.post = null;
    },
    setPostPage(state, action: PayloadAction<Post>) {
      state.post = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {});
    builder.addCase(GetPostThunk.fulfilled, (state, action) => {
      state.post = action.payload;
    });
  },
});

export const { resetPost, setPostPage } = postPageSlice.actions;

export const postPageReducer = postPageSlice.reducer;
