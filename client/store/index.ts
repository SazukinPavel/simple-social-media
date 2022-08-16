import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/authSlice";
import {postsReducer} from "./slices/postsSlice";

const store=configureStore({
    reducer:{
        auth:authReducer,
        posts:postsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

export default store;