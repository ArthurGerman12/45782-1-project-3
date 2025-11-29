import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./feed-slice";
import followingReducer from "./following-slice";
import adminReducer  from "./admin-slice";
import  feedVersionReducer from "./feedVersion-slice";

const store = configureStore({
    reducer: {
        feedSlice: feedReducer,
        followingSlice: followingReducer,
        adminSlice: adminReducer,
        feedVersion: feedVersionReducer

    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch