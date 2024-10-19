import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const RoomJoin = () => {
    const [response, setResponse] = useState('');
    const [email, setEmail] = useState('user@example.com');
    const [room, setRoom] = useState('testRoom');
    const [password, setPassword] = useState('1234');
    const socketRef = useRef(null);

    useEffect(() => {
        // Connect to the Socket.IO server
        socketRef.current = io('http://localhost:8000/project2');

        socketRef.current.on('connect', () => {
            console.log("Socket connected:", socketRef.current.id);
            setResponse('Connected to server');
        });

        // Listen for room:join event
        socketRef.current.on('room:join', (data) => {
            console.log('Room joined:', data);
            setResponse(`Successfully joined room: ${data.room} as ${data.email}`);
        });

        // Listen for room:join:failed event for incorrect password or other issues
        socketRef.current.on('room:join:failed', (data) => {
            console.log('Join room failed:', data.message);
            setResponse(`Failed to join room: ${data.message}`);
        });

        // Clean up on unmount
        return () => {
            socketRef.current.off('room:join');
            socketRef.current.off('room:join:failed');
            socketRef.current.disconnect();
            console.log("Socket disconnected");
        };
    }, []);

    const handleJoinRoom = () => {
        if (!email || !room || !password) {
            setResponse('Please fill in all fields.');
            return;
        }

        const joinData = { email, room, password };
        console.log(joinData);

        // Emit the room:join event to join a room
        socketRef.current.emit('room:join', joinData);
    };

    return (
        <div>
            <h1>Join a Room</h1>
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
            <button onClick={handleJoinRoom}>Join Room</button>
            {response && <p>{response}</p>}
        </div>
    );
};

export default RoomJoin;
