import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { io } from "socket.io-client";
import { getOAuthToken } from "../Auth/Authservice";

import { Send } from "lucide-react";

const UserChat = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [socket, setSocket] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const initializeSocket = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        const newSocket = io("http://localhost:4000", {  // 🔹 Changed port to 4000
          auth: { token },
        });

        newSocket.on("connect", () => {
          console.log("Connected to WebSocket server");
        });

        // Receiving messages from admin
        newSocket.on("userMessage", ({ message, from }) => {
          setMessages((prev) => [...prev, { sender: from || "admin", text: message, timestamp: new Date() }]);
        });

        setSocket(newSocket);
      }
    };

    initializeSocket();
    
    return () => {
      socket?.disconnect();
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim() && socket) {
      const newMessage = {
        text: messageInput,
        sender: "self",
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      socket.emit("userMessage", { message: messageInput }); // 🔹 Send message as an object
      setMessageInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full mx-auto transition-all">
      {/* Chat Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-center">No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === "self" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] px-4 py-3 rounded-xl shadow-sm ${message.sender === "self" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1">{new Date(message.timestamp).toLocaleTimeString()}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="p-3 border-t bg-white">
        <div className="flex items-end space-x-2">
          <textarea
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="w-full p-3 border rounded-lg"
          />
          <button onClick={handleSendMessage} disabled={!messageInput.trim()} className="p-3 rounded-full bg-blue-500 text-white">
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserChat;