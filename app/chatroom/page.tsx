"use client";
import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "@clerk/nextjs";
import { FiSend, FiMessageCircle, FiWifi, FiWifiOff, FiSettings, FiX, FiCheck } from "react-icons/fi";

// Message type definition
interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
}

// Theme options
const themes = [
  { id: 'default', name: 'Default', bgClass: 'bg-gradient-to-br from-gray-50 to-white' },
  { id: 'blue', name: 'Ocean Blue', bgClass: 'bg-gradient-to-br from-blue-500 to-teal-400' },
  { id: 'purple', name: 'Twilight', bgClass: 'bg-gradient-to-br from-purple-600 to-indigo-400' },
  { id: 'sunset', name: 'Sunset', bgClass: 'bg-gradient-to-br from-orange-500 to-pink-500' },
  { id: 'forest', name: 'Forest', bgClass: 'bg-gradient-to-br from-green-600 to-emerald-400' },
  { id: 'dark', name: 'Dark Mode', bgClass: 'bg-gradient-to-br from-gray-900 to-gray-800' },
];

const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [connected, setConnected] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
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

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Change theme
  const changeTheme = (theme: typeof themes[0]) => {
    setCurrentTheme(theme);
    setShowThemeSelector(false);
  };

  return (
    <div className={`min-h-screen flex flex-col ${currentTheme.bgClass} transition-colors duration-500`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-3 text-white shadow-md">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center space-x-2">
            <FiMessageCircle className="text-xl" />
            <h1 className="text-xl font-bold">Tourist Chatroom</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Connection status indicator */}
            <div className="flex items-center space-x-1 bg-black/20 py-1 px-2 rounded-full text-xs">
              {connected ? 
                <FiWifi className="text-green-300" /> : 
                <FiWifiOff className="text-red-300" />
              }
              <span>{connected ? 'Connected' : 'Connecting...'}</span>
            </div>
            
            {/* Theme selector button */}
            <button 
              onClick={() => setShowThemeSelector(!showThemeSelector)}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Change theme"
            >
              <FiSettings className="text-lg" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Theme selector modal */}
      {showThemeSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowThemeSelector(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX className="text-xl" />
            </button>
            
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Choose a Theme</h2>
            
            <div className="grid grid-cols-3 gap-3">
              {themes.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => changeTheme(theme)}
                  className={`
                    aspect-square flex flex-col items-center justify-center p-3 rounded-lg
                    transition-all duration-200 relative overflow-hidden
                    ${theme.id === currentTheme.id 
                      ? 'ring-2 ring-teal-500 ring-offset-2' 
                      : 'hover:ring-1 hover:ring-teal-300 hover:ring-offset-1'}
                  `}
                >
                  <div className={`absolute inset-0 ${theme.bgClass}`}></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <span className={`font-medium text-sm mb-1 ${theme.id === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      {theme.name}
                    </span>
                    {theme.id === currentTheme.id && (
                      <div className="bg-white/80 rounded-full p-1 mt-1">
                        <FiCheck className="text-teal-500 text-sm" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Main chat area - takes up all available space */}
      <div className="flex-grow flex flex-col max-w-5xl mx-auto w-full">
        {/* Chat messages */}
        <div className="flex-grow overflow-y-auto p-3 md:p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <FiMessageCircle className="text-5xl mb-4 text-gray-300" />
              <p className="text-lg font-medium">No messages yet</p>
              <p className="text-sm">Be the first to say hello!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((message) => {
                const isCurrentUser = message.sender === (user?.fullName || user?.username);
                return (
                  <div
                    key={message.id}
                    className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isCurrentUser && (
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white font-medium mr-2 text-xs">
                        {getInitials(message.sender)}
                      </div>
                    )}
                    
                    <div className={`max-w-xs md:max-w-md space-y-1`}>
                      {!isCurrentUser && (
                        <p className="text-xs text-gray-500 font-medium pl-1">{message.sender}</p>
                      )}
                      <div className={`
                        p-2.5 rounded-xl shadow-sm break-words
                        ${isCurrentUser 
                          ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-tr-none" 
                          : currentTheme.id === 'dark'
                            ? "bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-tl-none"
                            : "bg-gradient-to-r from-white to-gray-50 border border-gray-200 text-gray-700 rounded-tl-none"}
                      `}>
                        <p>{message.text}</p>
                      </div>
                      <p className={`text-xs ${isCurrentUser ? "text-right" : "text-left"} ${currentTheme.id === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                    
                    {isCurrentUser && (
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white font-medium ml-2 text-xs">
                        {getInitials(message.sender)}
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className={`p-3 ${currentTheme.id === 'dark' 
          ? 'bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700' 
          : 'bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm border-t border-gray-200'}`}
        >
          <div className="flex items-center space-x-2 max-w-5xl mx-auto">
            <input
              type="text"
              className={`flex-1 p-2.5 rounded-full border focus:ring-2 focus:ring-teal-500 focus:border-transparent
                ${currentTheme.id === 'dark' 
                  ? 'bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-700'}`}
              placeholder="Type your message here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!connected}
            />
            <button
              onClick={sendMessage}
              disabled={!connected || !inputValue.trim()}
              className={`
                p-2.5 rounded-full flex items-center justify-center
                ${(connected && inputValue.trim()) 
                  ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all' 
                  : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-500 cursor-not-allowed'}
              `}
            >
              <FiSend className="text-lg" />
            </button>
          </div>
          
          {!connected && (
            <p className="text-center text-xs text-red-500 mt-2">
              Waiting for connection to chat server...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
