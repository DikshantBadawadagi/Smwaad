import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import questionRouters from "./routes/quiz.js";
import resultRouters from "./routes/result.js";

dotenv.config();

// Express app and server setup
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.URL,
        methods: ['GET', 'POST'],
    }
});

const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: process.env.URL,
    credentials: true
};
app.use(cors(corsOptions));

// Project 1 API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);
app.use('/questions', questionRouters);
app.use('/results', resultRouters);

// Serve static files for both projects
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Socket namespaces for both projects
const project1Namespace = io.of('/project1');
const project2Namespace = io.of('/project2');

// Merged Project 1 Socket Logic
const userSocketMap1 = {};

project1Namespace.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap1[userId] = socket.id;
    }

    project1Namespace.emit('getOnlineUsers', Object.keys(userSocketMap1));

    socket.on('disconnect', () => {
        if (userId) {
            delete userSocketMap1[userId];
        }
        project1Namespace.emit('getOnlineUsers', Object.keys(userSocketMap1));
    });
});

// Merged Project 2 Socket Logic
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();
const roomPasswords = new Map(); // Store room passwords

project2Namespace.on('connection', (socket) => {
    console.log(`Socket Connected: ${socket.id}`);

    socket.on("room:create", (data) => {
        const { email, room, password } = data;

        // Check if the room already exists
        if (roomPasswords.has(room)) {
            // Emit a failure message to the client
            project2Namespace.to(socket.id).emit("room:create:failed", { message: "Room already exists." });
            console.log(`Room creation failed: ${room} already exists.`);
            return; // Exit the function to prevent further execution
        }

        // If the room does not exist, proceed with creation
        roomPasswords.set(room, password); // Store the password for the room
        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);
        socket.join(room);

        // Emit a success message to the client
        project2Namespace.to(socket.id).emit("room:created", { email, room });
        console.log(`Room created successfully: ${room}`);
    });

    socket.on("room:join", (data) => {
        const { email, room, password } = data;
        const roomPassword = roomPasswords.get(room);

        if (roomPassword && roomPassword === password) {
            emailToSocketIdMap.set(email, socket.id);
            socketidToEmailMap.set(socket.id, email);
            socket.join(room);
            project2Namespace.to(room).emit("user:joined", { email, id: socket.id });
            project2Namespace.to(socket.id).emit("room:join", { email, room });
            console.log(`${email} joined room: ${room}`);
        } else {
            project2Namespace.to(socket.id).emit("room:join:failed", { message: "Incorrect Password" });
            console.log(`Failed to join room ${room}: Incorrect Password`);
        }
    });

    socket.on("user:call", ({ to, offer }) => {
        project2Namespace.to(to).emit("incomming:call", { from: socket.id, offer });
      });
    
      socket.on("call:accepted", ({ to, ans }) => {
        project2Namespace.to(to).emit("call:accepted", { from: socket.id, ans });
      });
    
      socket.on("peer:nego:needed", ({ to, offer }) => {
        project2Namespace.to(to).emit("peer:nego:needed", { from: socket.id, offer });
      });
    
      socket.on("peer:nego:done", ({ to, ans }) => {
        project2Namespace.to(to).emit("peer:nego:final", { from: socket.id, ans });
      });
    
      socket.on("chat:message", (data) => {
        const room = Array.from(socket.rooms)[1]; // Get the room the socket is in
        const senderEmail = socketidToEmailMap.get(socket.id);
        project2Namespace.to(room).emit("chat:message", { sender: senderEmail, message: data.message });
      });
    
      socket.on("transcript:update", (data) => {
        const room = Array.from(socket.rooms)[1]; // Get the room the socket is in
        socket.to(room).emit("transcript:update", { transcript: data.transcript });
      });
    
      socket.on("disconnect", () => {
        const email = socketidToEmailMap.get(socket.id);
        emailToSocketIdMap.delete(email);
        socketidToEmailMap.delete(socket.id);
      });
    });
    

// Start the unified server
server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`); // This line confirms the server is running
    console.log(`Socket.IO server is listening on port ${PORT}`); // Add this line
});
