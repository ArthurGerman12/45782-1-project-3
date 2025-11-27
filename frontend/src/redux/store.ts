import { configureStore } from "@reduxjs/toolkit";
import feedSlice from "./feed-slice";

const store = configureStore({
    reducer: {
        feedSlice
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch