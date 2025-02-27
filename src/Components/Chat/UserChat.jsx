import React, { useState, useEffect, useRef } from "react";
import { Sun, Moon, User, Send, Paperclip } from "lucide-react";

const UserChat = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: "self",
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageInput("");
  };

  // 📌 Function to format timestamps (Instagram-style)
  const formatMessageTime = (date) => {
    const now = new Date();
    const diffSeconds = Math.floor((now - date) / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    
    if (diffSeconds < 60) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return date.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" });
  };

  // 📌 Function to group messages by date (Today, Yesterday, Monday, etc.)
  const groupMessagesByDate = () => {
    let groupedMessages = [];
    let currentDay = null;

    messages.forEach((message) => {
      const messageDate = new Date(message.timestamp);
      const messageDay = messageDate.toDateString();

      if (messageDay !== currentDay) {
        currentDay = messageDay;

        const now = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        let dateLabel = messageDay;
        if (messageDay === now.toDateString()) {
          dateLabel = "Today";
        } else if (messageDay === yesterday.toDateString()) {
          dateLabel = "Yesterday";
        } else {
          dateLabel = messageDate.toLocaleDateString([], { weekday: "long" });
        }

        groupedMessages.push({ type: "divider", label: dateLabel });
      }

      groupedMessages.push({ type: "message", message });
    });

    return groupedMessages;
  };

  const groupedMessages = groupMessagesByDate();

  return (
    <div
      className={`flex flex-col h-screen w-full mx-auto transition-all ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Header */}
      <div
        className={`p-3 flex items-center justify-between border-b ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex-shrink-0">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
          </div>
        </div>
        <div className="text-center flex-1 truncate">
          <h2 className="text-sm sm:text-lg font-semibold">John Doe</h2>
        </div>
        <button
          onClick={toggleTheme}
          className={`p-1 rounded-full transition ${
            isDarkMode ? "bg-gray-700 text-yellow-300" : "bg-gray-200 text-gray-700"
          }`}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>

      {/* Chat Area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className={`text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              No messages yet. Start a conversation!
            </p>
          </div>
        ) : (
          groupedMessages.map((group, index) =>
            group.type === "divider" ? (
              <div key={index} className="flex justify-center my-2">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}>
                  {group.label}
                </div>
              </div>
            ) : (
              <div key={group.message.id} className={`flex ${group.message.sender === "self" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] sm:max-w-[60%] px-3 py-2 rounded-xl ${
                    group.message.sender === "self"
                      ? isDarkMode
                        ? "bg-blue-600"
                        : "bg-blue-500 text-white"
                      : isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-300"
                  }`}
                >
                  <p className="text-xs sm:text-sm">{group.message.text}</p>
                  <p className="text-xs mt-1 text-right text-blue-200">{formatMessageTime(group.message.timestamp)}</p>
                </div>
              </div>
            )
          )
        )}
      </div>

      {/* Message Input */}
      <div className={`p-2 border-t ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        <div className="flex items-center space-x-2">
          <input type="file" className="hidden" accept="image/*" />
          <button className={`p-2 rounded-full ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"}`}>
            <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <div className="flex-1">
            <textarea
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              rows={1}
              className={`w-full resize-none p-2 sm:p-3 rounded-xl text-xs sm:text-sm ${
                isDarkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-gray-100 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>
          <button
            onClick={sendMessage}
            className={`p-2 sm:p-3 rounded-full ${
              !messageInput.trim() ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 text-white"
            }`}
            disabled={!messageInput.trim()}
          >
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
