import React, { createContext, useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setSocket } from '../redux/socketSlice'; // Ensure the correct import

const SOCKET_URL = 'http://localhost:8000/project2'; // Update this URL to match your server namespace

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [socket, setSocketLocal] = useState(null);

    useEffect(() => {
        const newSocket = io(SOCKET_URL, { path: '/socket.io' });

        newSocket.on('connect', () => {
            console.log(`Socket connected: ${newSocket.id}`);
            dispatch(setSocket(newSocket)); // Dispatch to Redux when connected
        });

        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
            dispatch(setSocket(null)); // Dispatch null when disconnected
        });

        setSocketLocal(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [dispatch]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

// Custom hook to use the socket
export const useSocket = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};
