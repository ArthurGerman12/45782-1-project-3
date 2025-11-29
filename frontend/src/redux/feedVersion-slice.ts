import { createSlice } from "@reduxjs/toolkit";

interface FeedVersionState {
    value: number;
}

const initialState: FeedVersionState = {
    value: 0
};

export const feedVersionSlice = createSlice({
    name: "feedVersion",
    initialState,
    reducers: {
        bump: (state) => {
            state.value++;
        }
    }
});

export const { bump } = feedVersionSlice.actions;
export default feedVersionSlice.reducer;
