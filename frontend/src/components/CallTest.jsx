import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const UserCall = () => {
    const [response, setResponse] = useState('');
    const [recipientId, setRecipientId] = useState(''); // Recipient's socket ID
    const [offer, setOffer] = useState(''); // Offer to send
    const socketRef = useRef(null);

    useEffect(() => {
        // Connect to the Socket.IO server
        socketRef.current = io('http://localhost:8000/project2');

        socketRef.current.on('connect', () => {
            console.log("Socket connected:", socketRef.current.id);
            setResponse('Connected to server');
        });

        // Listen for incoming calls
        socketRef.current.on('incomming:call', (data) => {
            console.log('Incoming call:', data);
            setResponse(`Incoming call from ${data.from} with offer: ${data.offer}`);
        });

        // Clean up on unmount
        return () => {
            socketRef.current.off('incomming:call');
            socketRef.current.disconnect();
            console.log("Socket disconnected");
        };
    }, []);

    const handleCallUser = () => {
        if (!recipientId || !offer) {
            setResponse('Please fill in all fields.');
            return;
        }

        const callData = {
            to: recipientId,
            offer,
        };
        console.log(callData);

        // Emit the user:call event to initiate a call
        socketRef.current.emit('user:call', callData);
        setResponse(`Calling ${recipientId}...`);
    };

    return (
        <div>
            <h1>Initiate a Call</h1>
            <input
                type="text"
                placeholder="Recipient Socket ID"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Offer"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
            />
            <button onClick={handleCallUser}>Call User</button>
            {response && <p>{response}</p>}
        </div>
    );
};

export default UserCall;
