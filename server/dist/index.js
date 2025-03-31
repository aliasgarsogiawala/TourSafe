"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Enable CORS
app.use((0, cors_1.default)());
// Initialize Socket.io
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
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
