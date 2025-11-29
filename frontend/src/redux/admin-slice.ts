import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type Vacation from "../models/Vacation";

interface AdminState {
    vacations: Vacation[]
}

const initialState: AdminState = {
    vacations: []
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Vacation[]>) => {
            state.vacations = action.payload
        },
        newVacation: (state, action: PayloadAction<Vacation>) => {
            state.vacations = [action.payload, ...state.vacations]
        },
        updateVacation: (state, action: PayloadAction<Vacation>) => {
            const idx = state.vacations.findIndex(p => p.vacationId === action.payload.vacationId)
            if (idx > -1) state.vacations[idx] = action.payload
        },
        deleteVacation: (state, action: PayloadAction<string>) => {
            state.vacations = state.vacations.filter(p => p.vacationId !== action.payload)
        }
    }
})

export const { init, newVacation, updateVacation, deleteVacation } = adminSlice.actions

export default adminSlice.reducer