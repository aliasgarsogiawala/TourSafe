const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Enable CORS with wildcard to accept all origins
app.use(cors({
  origin: '*',
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// Initialize Socket.io with wildcard CORS settings
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
  },
  transports: ['websocket', 'polling']
});

// Add a simple route for health check
app.get('/', (req, res) => {
  res.send('TourSafe Socket.io Server is running');
});

// Store messages in memory
const messages = [];

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Send existing messages to the newly connected client
  socket.emit('initialMessages', messages);
  
  // Handle new messages
  socket.on('sendMessage', (message) => {
    try {
      // Add timestamp if not present
      if (!message.timestamp) {
        message.timestamp = new Date();
      }
      
      // Store message
      messages.push(message);
      
      // Keep only the last 100 messages
      if (messages.length > 100) {
        messages.shift();
      }
      
      // Broadcast the message to all connected clients
      io.emit('message', message);
      console.log(`Message received: ${message.text}`);
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});