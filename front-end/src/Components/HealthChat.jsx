import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
const MessageBubble = ({ text, sender }) => {
  return (
    <div
      className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`rounded-lg p-3 max-w-xs ${
          sender === "user"
            ? "bg-primary text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

// main chat component
const HealthChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  //Auto-scroll to bottom when messages change
  const scrollTobottom = () => {
    messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  };

  useEffect(() => {
    scrollTobottom();
  }, [messages]);

  // handle sending messages
  const handleSend = () => {
    if (inputText.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: inputText, sender: "user" },
      ]);

      //simulating a bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "Hello, I am a health bot, how may I help you?",
            sender: "bot",
          },
        ]);
      }, 1000);
      setInputText("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-t-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800  text-center">
          Health bot
        </h2>
      </div>

      {/* Chat message container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((messages) => (
          <MessageBubble
            key={messages.id}
            text={messages.text}
            sender={messages.sender}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="bg-white p-4 rounded-b-lg shadow-sm">
        <div className="flex">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-primary"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthChat;
