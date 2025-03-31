"use client";
import React, { useState } from "react";

// Sample data for messages
const initialMessages = [
  { id: 1, sender: "Admin", text: "Welcome to the Tourist Chatroom!" },
  { id: 2, sender: "Admin", text: "Feel free to ask anything about the area." },
];

const ChatRoom = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");

  // Function to handle sending a message
  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = { id: messages.length + 1, sender: "You", text: inputValue };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-100 to-green-200 flex justify-center items-center">
      <div className="floating-bubbles"></div>

      <div className="chat-container bg-white shadow-2xl rounded-lg p-6 w-full max-w-3xl relative z-10">
        <h1 className="text-3xl font-bold mb-4 text-center text-teal-600">Tourist Chatroom</h1>

        {/* Chat box to display messages */}
        <div className="chat-box h-96 overflow-y-auto p-4 space-y-4 rounded-lg bg-gray-100 shadow-inner flex flex-col">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-bubble ${
                message.sender === "You" ? "self-end" : "self-start"
              }`} // "You" messages align to the right, Admin messages to the left
            >
              <div
                className={`${
                  message.sender === "You"
                    ? "bg-teal-400 text-white"
                    : "bg-white text-gray-700"
                } p-3 rounded-3xl shadow-md max-w-xs md:max-w-md break-words`} // Ensures text wraps properly
              >
                <p className="font-semibold">{message.sender}</p>
                <p>{message.text}</p>
              </div>
            </div>
          ))}
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
          />
          <button
            onClick={sendMessage}
            className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
