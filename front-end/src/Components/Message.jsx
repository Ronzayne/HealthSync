import React, { useState, useEffect, useRef, useContext } from "react";
import io from "socket.io-client";
import { AppContext } from "../Context/AppContext";
import { useLocation } from "react-router-dom";

const Message = () => {
  const { userData, backendUrl, token, loadUserProfileData } =
    useContext(AppContext);
  const location = useLocation();
  const { id: doctorId, info: doctorInfo } = location.state;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!userData && token) {
      loadUserProfileData();
    }
  }, [userData, token, loadUserProfileData]);

  useEffect(() => {
    if (userData && doctorId) {
      setLoading(false);
    }
  }, [userData, doctorId]);

  useEffect(() => {
    if (userData?._id && doctorId) {
      fetch(`${backendUrl}/api/messages/${userData._id}/${doctorId}`)
        .then((res) => res.json())
        .then((data) => setMessages(data))
        .catch((error) => console.error("Error fetching chat history:", error));
    }
  }, [userData, doctorId, backendUrl]);

  useEffect(() => {
    if (token && !socketRef.current) {
      socketRef.current = io(backendUrl, { query: { token } });
      socketRef.current.on("receiveMessage", (message) => {
        setMessages((prev) => [...prev, { ...message, timestamp: new Date() }]);
      });
      return () => socketRef.current.disconnect();
    }
  }, [token, backendUrl]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, msg) => {
      const date = new Date(msg.timestamp).toDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
      return groups;
    }, {});
  };

  const formatDateLabel = (dateString) => {
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateString === today) return "Today";
    if (dateString === yesterday.toDateString()) return "Yesterday";
    return dateString;
  };

  const sendMessage = () => {
    if (newMessage.trim() && socketRef.current) {
      const message = {
        sender: userData._id,
        senderModel: "user",
        receiver: doctorId,
        receiverModel: "doctor",
        content: newMessage,
        timestamp: new Date().toISOString(),
      };
      socketRef.current.emit("sendMessage", message);
      setMessages((prev) => [...prev, { ...message, timestamp: new Date() }]);
      setNewMessage("");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!userData?._id)
    return <p>User data not available. Please log in again.</p>;

  const groupedMessages = groupMessagesByDate(messages);
  const sortedDates = Object.keys(groupedMessages).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4 bg-gray-50">
      <div className="bg-primary text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-semibold">{doctorInfo}</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-white border border-gray-200">
        {messages.length === 0 ? (
          <p>No messages yet. Start the conversation!</p>
        ) : (
          sortedDates.map((date, index) => (
            <div key={index}>
              <div className="text-center text-gray-500 my-4 ">
                {formatDateLabel(date)}
              </div>
              {groupedMessages[date].map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === userData._id
                      ? "justify-end"
                      : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      msg.sender === userData._id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs mt-1 text-right text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 p-4 bg-white border-t border-gray-200">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
