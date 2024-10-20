// questionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const questionSlice = createSlice({
    name: 'questions',
    initialState: [],
    reducers: {
        fetchAll: (state, action) => {
            return action.payload; // updated handling for fetchAll
        },
        create: (state, action) => {
            state.push(action.payload); // updated handling for create
        }
    }
});

export const { fetchAll, create } = questionSlice.actions;

export default questionSlice.reducer;
