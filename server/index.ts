import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(cors());

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Store messages in memory (in a production app, you'd use a database)
const messages: any[] = [];

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Send existing messages to the newly connected client
  socket.emit('initialMessages', messages);
  
  // Handle new messages
  socket.on('sendMessage', (message) => {
    messages.push(message);
    // Broadcast the message to all connected clients
    io.emit('message', message);
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});