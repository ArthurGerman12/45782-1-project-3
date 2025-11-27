import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type Vacation from "../models/Vacation";

interface FeedState {
    vacations: Vacation[],
    isNewContentAvailable: boolean
}

const initialState: FeedState = {
    vacations: [],
    isNewContentAvailable: false
};

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Vacation[]>) => {
            state.vacations = action.payload;
            state.isNewContentAvailable = false;
        },
        indicateNewContentAvailable: (state) => {
            state.isNewContentAvailable = true;
        }
    }
});

export const { init, indicateNewContentAvailable } = feedSlice.actions;

export default feedSlice.reducer;