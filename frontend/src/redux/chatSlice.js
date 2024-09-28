<<<<<<< HEAD
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name:"chat",
    initialState:{
        onlineUsers:[],
        messages:[],
    },
    reducers:{
        // actions
        setOnlineUsers:(state,action) => {
            state.onlineUsers = action.payload;
        },
        setMessages:(state,action) => {
            state.messages = action.payload;
        }
    }
});
export const {setOnlineUsers, setMessages} = chatSlice.actions;
=======
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name:"chat",
    initialState:{
        onlineUsers:[],
        messages:[],
    },
    reducers:{
        // actions
        setOnlineUsers:(state,action) => {
            state.onlineUsers = action.payload;
        },
        setMessages:(state,action) => {
            state.messages = action.payload;
        }
    }
});
export const {setOnlineUsers, setMessages} = chatSlice.actions;
>>>>>>> 6fa5ee436a07f107cb4d29c67bd2626acd18c259
export default chatSlice.reducer;