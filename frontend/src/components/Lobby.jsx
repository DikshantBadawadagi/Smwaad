import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider"; // Ensure this path is correct
import C1 from './C1.png'
import LeftImage from './C2.png'; // Add your left side image
import RightImage from './C3.png';
const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const socket = useSocket(); // This should work now
  const navigate = useNavigate();

  console.log('Socket in Lobby:', socket); // Check if the socket is available

  // Handle room creation
  const handleCreateRoom = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Creating room with data:", { email, room, password });
      socket.emit("room:create", { email, room, password });
    },
    [email, room, password, socket]
  );

  // Handle room joining
  const handleJoinRoom = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Joining room with data:", { email, room, password });
      socket.emit("room:join", { email, room, password });
    },
    [email, room, password, socket]
  );

  // Handle successful room creation
  const handleRoomCreated = useCallback(
    (data) => {
      console.log("Room created successfully:", data);
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  // Handle successful room join
  const handleRoomJoined = useCallback(
    (data) => {
      console.log("Joined room successfully:", data);
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  // Handle join failure (incorrect password)
  const handleJoinFailed = useCallback((data) => {
    alert(data.message); // Show an alert on incorrect password
    console.log("Join failed:", data.message);
  }, []);

  useEffect(() => {
    if (socket) { // Check if the socket is initialized
      socket.on("room:created", handleRoomCreated);
      socket.on("room:join", handleRoomJoined);
      socket.on("room:join:failed", handleJoinFailed);
    }

    return () => {
      if (socket) { // Check again before removing listeners
        socket.off("room:created", handleRoomCreated);
        socket.off("room:join", handleRoomJoined);
        socket.off("room:join:failed", handleJoinFailed);
      }
    };
  }, [socket, handleRoomCreated, handleRoomJoined, handleJoinFailed]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#205afc]">
      {/* Left Image */}
      <img
        src= {LeftImage}
        alt="Left Side Image"
        className="absolute left-20 top-1/2 transform -translate-y-1/2 w-100"
      />
      
      {/* Right Image */}
      <img
  src={RightImage}
  alt="Right Side Image"
  className="absolute right-20 top-1/2 transform -translate-y-1/2"
  style={{ width: '200px', height: 'auto' }} // Adjust width and height as needed
/>

  
      <div className="w-full max-w-lg bg-[#205afc] rounded-lg shadow-md p-8 relative z-10">
        {/* Image Above */}
        <img
          src= {C1}
          alt="Above Image"
          className="w-100 mx-auto mb-4"
        />
        
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Welcome to the Lobby
        </h1>
  
        <form onSubmit={isCreatingRoom ? handleCreateRoom : handleJoinRoom} className="space-y-8 mx-auto">
  <div>
    <label htmlFor="email" className="block text-lg font-medium text-white mb-2 text-center">
      Email ID
    </label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-300 text-lg"
      placeholder="Enter your email"
      required
    />
  </div>
  <div>
    <label htmlFor="room" className="block text-lg font-medium text-white mb-2 text-center">
      Room Number
    </label>
    <input
      type="text"
      id="room"
      value={room}
      onChange={(e) => setRoom(e.target.value)}
      className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-300 text-lg"
      placeholder="Enter room number"
      required
    />
  </div>
  <div>
    <label htmlFor="password" className="block text-lg font-medium text-white mb-2 text-center">
      Password
    </label>
    <input
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-300 text-lg"
      placeholder="Enter room password"
      required
    />
  </div>
  <div className="flex justify-center space-x-4">
    <button
      type="button"
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
      onClick={() => setIsCreatingRoom(true)}
    >
      Create Room
    </button>
    <button
      type="submit"
      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
    >
      {isCreatingRoom ? "Create" : "Join Room"}
    </button>
  </div>
</form>

      </div>
    </div>
  );
  
  
};

export default LobbyScreen;
