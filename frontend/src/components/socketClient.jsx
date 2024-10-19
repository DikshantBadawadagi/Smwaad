import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const SocketClient = () => {
    const [response, setResponse] = useState('');
    const [email, setEmail] = useState('user@example.com');
    const [room, setRoom] = useState('testRoom');
    const [password, setPassword] = useState('1234');
    const socketRef = useRef(null); // Create a ref to hold the socket

    useEffect(() => {
        // Connect to the Socket.IO server
        socketRef.current = io('http://localhost:8000/project2');

        // Log the socket ID after it's created
        socketRef.current.on('connect', () => {
            console.log("Socket connected:", socketRef.current.id); // Log the socket ID here
        });
        console.log("hello1")
        // Listen for the room:create event
        socketRef.current.on('room:created', (data) => {
            console.log('Room created:', data);
            setResponse(`Room created: ${data.room} for ${data.email}`);
            console.log("hello")
        });

        // Clean up the connection on unmount
        return () => {
            socketRef.current.disconnect();
            console.log("Socket disconnected"); // Log when the socket is disconnected
        };
    }, []);

    const handleCreateRoom = () => {
        const roomData = {
            email,
            room,
            password,
        };
        console.log(roomData)
        // Emit the room:create event using the existing socket connection
        socketRef.current.emit('room:create', roomData);
    };

    return (
        <div>
            <h1>Socket.IO Room Creation</h1>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Room Name"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleCreateRoom}>Create Room</button>
            {response && <p>{response}</p>}
        </div>
    );
};

export default SocketClient;
