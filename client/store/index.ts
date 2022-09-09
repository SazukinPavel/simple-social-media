import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { postsReducer } from "./slices/postsSlice";
import { userPageReducer } from "./slices/userPageSlice";
import { postPageReducer } from "./slices/postPageSlice";
import { usersReducer } from "./slices/usersSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      posts: postsReducer,
      userPage: userPageReducer,
      postPage: postPageReducer,
      users: usersReducer,
    },
  });
};

export const store = makeStore();
export type RootDispatch = typeof store.dispatch;
export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export const wrapper = createWrapper<RootStore>(makeStore);
