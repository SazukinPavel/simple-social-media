import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { postsReducer } from "./slices/postsSlice";
import { userPageReducer } from "./slices/userPageSlice";
import { postPageReducer } from "./slices/postPageSlice";
import { usersReducer } from "./slices/usersSlice";
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    userPage: userPageReducer,
    postPage: postPageReducer,
    users: usersReducer,
  },
});

export type RootDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
