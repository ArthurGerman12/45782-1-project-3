import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FollowingState {
    following: string[];
}

const initialState: FollowingState = {
    following: []
};

export const followingSlice = createSlice({
    name: "following",
    initialState,
    reducers: {
        init: (state, action: PayloadAction<string[]>) => {
            state.following = action.payload;
        },
        follow: (state, action: PayloadAction<string>) => {
            if (!state.following.includes(action.payload)) {
                state.following.push(action.payload);
            }
        },
        unfollow: (state, action: PayloadAction<string>) => {
            state.following = state.following.filter(id => id !== action.payload);
        }
    }
});

export const { init, follow, unfollow } = followingSlice.actions;

export default followingSlice.reducer;
