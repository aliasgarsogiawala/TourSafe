// Add this line at the top if not already there
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(cors({
  origin: [
    "https://tour-safe.vercel.app",
    "https://tour-safe-qfg9nny3i-aliasgar-soglawalas-projects.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// Initialize Socket.io with proper CORS settings for production
const io = new Server(server, {
  cors: {
    origin: [
      "https://tour-safe.vercel.app",
      "https://tour-safe-qfg9nny3i-aliasgar-soglawalas-projects.vercel.app",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["my-custom-header"]
  }
});

// Add a simple route for health check
app.get('/', (req, res) => {
  res.send('TourSafe Socket.io Server is running');
});

// Store messages in memory (in a production app, you'd use a database)
const messages = [];

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