const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: true,
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();
const roomPasswords = new Map(); // Store room passwords

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);

  // Room Creation with Password
  socket.on("room:create", (data) => {
    const { email, room, password } = data;
    roomPasswords.set(room, password); // Store the password for the room
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    socket.join(room);
    io.to(socket.id).emit("room:created", { email, room });
  });

  // Room Join with Password Validation
  socket.on("room:join", (data) => {
    const { email, room, password } = data;
    const roomPassword = roomPasswords.get(room);

    if (roomPassword && roomPassword === password) {
      emailToSocketIdMap.set(email, socket.id);
      socketidToEmailMap.set(socket.id, email);
      socket.join(room);
      io.to(room).emit("user:joined", { email, id: socket.id });
      io.to(socket.id).emit("room:join", { email, room });
    } else {
      io.to(socket.id).emit("room:join:failed", { message: "Incorrect Password" });
    }
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  // New event handlers for chat and transcript

  socket.on("chat:message", (data) => {
    const room = Array.from(socket.rooms)[1]; // Get the room the socket is in
    const senderEmail = socketidToEmailMap.get(socket.id);
    io.to(room).emit("chat:message", { sender: senderEmail, message: data.message });
  });

  socket.on("transcript:update", (data) => {
    const room = Array.from(socket.rooms)[1]; // Get the room the socket is in
    socket.to(room).emit("transcript:update", { transcript: data.transcript });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    const email = socketidToEmailMap.get(socket.id);
    emailToSocketIdMap.delete(email);
    socketidToEmailMap.delete(socket.id);
    // You might want to handle room cleanup here if needed
  });
});