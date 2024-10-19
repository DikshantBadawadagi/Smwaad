import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider"; // Ensure this path is correct

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">
          Welcome to the Lobby
        </h1>

        <form onSubmit={isCreatingRoom ? handleCreateRoom : handleJoinRoom} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-2">
              Room Number
            </label>
            <input
              type="text"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-300"
              placeholder="Enter room number"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-300"
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
    </div>
  );
};

export default LobbyScreen;
