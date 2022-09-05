import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/authSlice";
import {postsReducer} from "./slices/postsSlice";
import {userPageReducer} from "./slices/userPageSlice";
import {postPageReducer} from "./slices/postPageSlice";
import { usersReducer } from "./slices/usersSlice";

const store=configureStore({
    reducer:{
        auth:authReducer,
        posts:postsReducer,
        userPage:userPageReducer,
        postPage:postPageReducer,
        users:usersReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

export default store;