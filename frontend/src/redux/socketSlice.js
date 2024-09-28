<<<<<<< HEAD
import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name:"socketio",
    initialState:{
        socket:null
    },
    reducers:{
        // actions
        setSocket:(state,action) => {
            state.socket = action.payload;
        }
    }
});
export const {setSocket} = socketSlice.actions;
=======
import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name:"socketio",
    initialState:{
        socket:null
    },
    reducers:{
        // actions
        setSocket:(state,action) => {
            state.socket = action.payload;
        }
    }
});
export const {setSocket} = socketSlice.actions;
>>>>>>> 6fa5ee436a07f107cb4d29c67bd2626acd18c259
export default socketSlice.reducer;