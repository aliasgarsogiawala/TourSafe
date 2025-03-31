"use client";
import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "@clerk/nextjs";

// Message type definition
interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
}

const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  
  // Connect to socket server when component mounts
  useEffect(() => {
    // Connect to the WebSocket server
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001");
    
    // Set up event listeners
    socketRef.current.on("connect", () => {
      setConnected(true);
      console.log("Connected to chat server");
    });
    
    socketRef.current.on("message", (message: Message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });
    
    socketRef.current.on("initialMessages", (initialMessages: Message[]) => {
      setMessages(initialMessages);
    });
    
    // Clean up on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to handle sending a message
  const sendMessage = () => {
    if (inputValue.trim() !== "" && socketRef.current && user) {
      const newMessage = {
        id: Date.now().toString(),
        sender: user.fullName || user.username || "Anonymous",
        text: inputValue,
        timestamp: new Date()
      };
      
      // Emit the message to the server
      socketRef.current.emit("sendMessage", newMessage);
      setInputValue("");
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-100 to-green-200 flex justify-center items-center p-4">
      <div className="chat-container bg-white shadow-2xl rounded-lg p-6 w-full max-w-3xl relative z-10">
        <h1 className="text-3xl font-bold mb-4 text-center text-teal-600">Tourist Chatroom</h1>
        
        {/* Connection status indicator */}
        <div className="flex items-center justify-center mb-4">
          <div className={`h-3 w-3 rounded-full mr-2 ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-600">{connected ? 'Connected' : 'Connecting...'}</span>
        </div>

        {/* Chat box to display messages */}
        <div className="chat-box h-96 overflow-y-auto p-4 space-y-4 rounded-lg bg-gray-100 shadow-inner flex flex-col">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 my-auto">
              No messages yet. Be the first to say hello!
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`message-bubble ${
                  message.sender === (user?.fullName || user?.username) ? "self-end" : "self-start"
                }`}
              >
                <div
                  className={`${
                    message.sender === (user?.fullName || user?.username)
                      ? "bg-teal-400 text-white"
                      : "bg-white text-gray-700"
                  } p-3 rounded-3xl shadow-md max-w-xs md:max-w-md break-words`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold">{message.sender}</p>
                    <p className="text-xs opacity-70">{formatTime(message.timestamp)}</p>
                  </div>
                  <p>{message.text}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input box */}
        <div className="input-box flex items-center mt-4 space-x-4">
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
            placeholder="Type your message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!connected}
          />
          <button
            onClick={sendMessage}
            className={`${
              connected ? 'bg-teal-500 hover:bg-teal-600' : 'bg-gray-400 cursor-not-allowed'
            } text-white py-2 px-4 rounded-lg transition duration-300`}
            disabled={!connected}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
