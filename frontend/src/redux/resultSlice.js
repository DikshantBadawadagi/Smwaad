// resultSlice.js
import { createSlice } from '@reduxjs/toolkit';

const resultSlice = createSlice({
    name: 'results',
    initialState: [],
    reducers: {
        fetchAllResults: (state, action) => {
            return action.payload; // handling for fetching all results
        },
        createResults: (state, action) => {
            state.push(action.payload); // handling for creating a new result
        }
    }
});

export const { fetchAllResults, createResults } = resultSlice.actions;

export default resultSlice.reducer;
