import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import C1 from './C1.png'
import LeftImage from './C2.png'; // Add your left side image
import RightImage from './C3.png';

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState(""); // New state for password
  const [isCreatingRoom, setIsCreatingRoom] = useState(false); // Toggle between create/join

  const socket = useSocket();
  const navigate = useNavigate();

  // Handle room creation
  const handleCreateRoom = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:create", { email, room, password });
    },
    [email, room, password, socket]
  );

  // Handle joining a room
  const handleJoinRoom = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room, password });
    },
    [email, room, password, socket]
  );

  // Handle room creation success
  const handleRoomCreated = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  // Handle room join success
  const handleRoomJoined = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  // Handle join failure (incorrect password)
  const handleJoinFailed = useCallback((data) => {
    alert(data.message); // Show an alert on incorrect password
  }, []);

  useEffect(() => {
    socket.on("room:created", handleRoomCreated);
    socket.on("room:join", handleRoomJoined);
    socket.on("room:join:failed", handleJoinFailed);

    return () => {
      socket.off("room:created", handleRoomCreated);
      socket.off("room:join", handleRoomJoined);
      socket.off("room:join:failed", handleJoinFailed);
    };
  }, [socket, handleRoomCreated, handleRoomJoined, handleJoinFailed]);

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#205afc' }}>
      {/* Left Image */}
      <div className="hidden md:block">
        <img src={LeftImage} className="w-48 h-auto" alt="Left" />
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center space-y-6 mx-8">
        <nav className="bg-[#205afc] p-4 fixed top-0 left-0 w-full">
          <h1 className="text-white text-2xl font-bold">Swammad</h1>
        </nav>
        <h1 className="text-4xl font-bold text-white text-center mb-8 mt-4">
          Welcome to the Lobby
        </h1>
        <img src={C1} className="w-full h-50 object-cover mb-8" alt="Center Image" />
        
        <form onSubmit={isCreatingRoom ? handleCreateRoom : handleJoinRoom} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-2xl font-medium text-white mb-2">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-300 text-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="room" className="block text-2xl font-medium text-white mb-2">
              Room Number
            </label>
            <input
              type="text"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-300 text-lg"
              placeholder="Enter room number"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-2xl font-medium text-white mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-300 text-lg"
              placeholder="Enter room password"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
              onClick={() => setIsCreatingRoom(true)}
            >
              Create Room
            </button>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-md"
            >
              {isCreatingRoom ? "Create" : "Join Room"}
            </button>
          </div>
        </form>
      </div>

      {/* Right Image */}
      <div className="hidden md:block">
        <img src={RightImage} className="w-48 h-auto" alt="Right" />
      </div>
    </div>
  );
  
  
};

export default LobbyScreen;
