import React, { useState, useRef, useEffect } from 'react';
import { io } from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from 'react-router';  // Import Navigate for redirection
import { Sun, Moon, Paperclip, Send, Mic, X, MoreVertical, ChevronLeft, Image, Video, FilePlus, Smile } from 'lucide-react';

const AdminChat = ({ users = [], messages = {}, onReadMessages = () => {} }) => {
  const { getAccessTokenSilently, user, isAuthenticated, isLoading } = useAuth0();
  const [socket, setSocket] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [localMessages, setLocalMessages] = useState(messages);
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);

  // Check if the user is authenticated and has the 'admin' role
  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated || (user?.roles?.[0] !== "admin")) {
    // If not an admin, redirect to the normal chat page
    return <Navigate to="/chat" />;
  }

  // Connect to Socket.io when the component mounts
  useEffect(() => {
    const initializeSocket = async () => {
      const token = await getAccessTokenSilently();
      const newSocket = io("http://localhost:4000", {  // Connect to Socket.io on port 4000
        auth: { token },
      });

      newSocket.on("connect", () => {
        console.log("Connected as Admin");
      });

      // Receiving messages from users
      newSocket.on("adminMessage", ({ user, message }) => {
        setLocalMessages(prev => ({
          ...prev,
          [user]: [...(prev[user] || []), { sender: "user", content: message, time: new Date().toLocaleTimeString() }]
        }));
      });

      setSocket(newSocket);
    };

    initializeSocket();
    
    return () => {
      if (socket) socket.disconnect();
    };
  }, [getAccessTokenSilently, socket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [localMessages, selectedUser]);

  const sendMessage = () => {
    if (messageInput.trim() === '' || !selectedUser || !socket) return;

    const newMessage = {
      sender: "admin",
      content: messageInput,
      time: new Date().toLocaleTimeString(),
    };

    setLocalMessages(prev => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage]
    }));

    socket.emit("adminMessage", { email: selectedUser.email, message: messageInput });

    setMessageInput('');
  };

  return (
    <div className="flex h-screen">
      {/* Users Sidebar */}
      <div className="w-80 border-r bg-gray-50">
        <div className="p-4 border-b flex justify-between">
          <h2 className="text-xl font-bold">Messages</h2>
        </div>

        <div className="overflow-y-auto h-full pb-20">
          {users.map(user => (
            <div key={user.id} onClick={() => setSelectedUser(user)}
              className={`p-3 border-b cursor-pointer hover:bg-gray-100 ${selectedUser?.id === user.id ? "bg-gray-200" : ""}`}>
              <div className="flex items-center">
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full mr-3" />
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.lastSeen}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-3 border-b bg-gray-100 flex justify-between">
              <div className="flex items-center">
                <button onClick={() => setSelectedUser(null)} className="mr-2">
                  <ChevronLeft size={20} />
                </button>
                <img src={selectedUser.avatar} alt={selectedUser.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <h3 className="font-semibold">{selectedUser.name}</h3>
                  <p className="text-xs text-gray-500">{selectedUser.lastSeen}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {localMessages[selectedUser.id]?.map((message, index) => (
                <div key={index} className={`max-w-md mb-4 ${message.sender === "admin" ? "ml-auto" : "mr-auto"}`}>
                  <div className={`p-3 rounded-lg ${message.sender === "admin" ? "bg-blue-500 text-white" : "bg-white border"}`}>
                    {message.content}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{message.time}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-3 border-t bg-white">
              <div className="flex items-center">
                <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..." className="flex-1 p-2 border rounded-lg" />
                <button onClick={sendMessage} className="p-2 rounded-full bg-blue-500 text-white ml-2">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p>Select a conversation from the sidebar to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;