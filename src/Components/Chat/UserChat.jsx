import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Sun, Moon, User, Send, Paperclip, LogOut, Camera, Trash2, Smile, X } from "lucide-react";

// Enhanced emoji picker component with categories
const EmojiPicker = ({ onEmojiClick, isDarkMode, onClose }) => {
  const [activeCategory, setActiveCategory] = useState('smileys');
  
  const categories = {
    smileys: {
      name: "Smileys",
      icon: "😊",
      emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "🥲", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬"]
    },
    gestures: {
      name: "Gestures",
      icon: "👍",
      emojis: ["👋", "🤚", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🫰", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🙏", "✍️", "💪", "🦾", "🖤", "💔", "❤️", "❤️‍🔥", "❤️‍🩹", "💘", "💝"]
    },
    nature: {
      name: "Nature",
      icon: "🌸",
      emojis: ["🌱", "🪴", "🌲", "🌳", "🌴", "🪵", "🌵", "🌾", "🌿", "☘️", "🍀", "🍁", "🍂", "🍃", "🪷", "🌺", "🌸", "🌼", "🌻", "🌞", "🌝", "🌛", "🌜", "🌚", "🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔", "🌙", "🌎", "🪐", "⭐", "🌟", "✨", "⚡", "☄️", "💥", "🔥", "🌪️", "🌈", "☀️", "🌤️", "⛅", "🌥️", "☁️", "🌦️", "🌧️", "⛈️", "🌩️", "🌨️", "❄️", "☃️", "⛄", "🌬️", "💨", "💧", "💦", "🫧", "☔", "☂️", "🌊"]
    },
    food: {
      name: "Food",
      icon: "🍔",
      emojis: ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🫛", "🥦", "🥬", "🥒", "🌶️", "🫑", "🌽", "🥕", "🫒", "🧄", "🧅", "🥔", "🍠", "🥐", "🥯", "🍞", "🥖", "🥨", "🧀", "🥚", "🍳", "🧈", "🥞", "🧇", "🥓", "🥩", "🍗", "🍖", "🦴", "🌭", "🍔", "🍟", "🍕", "🫓", "🥪", "🥙", "🧆", "🌮", "🌯", "🫔", "🥗", "🥘", "🫕", "🥫", "🍝", "🍜", "🍲", "🍛", "🍣", "🍱", "🥟", "🦪", "🍤", "🍙", "🍚", "🍘", "🍥", "🥠", "🥮", "🍢", "🍡", "🍧", "🍨", "🍦", "🥧", "🧁", "🍰", "🎂", "🍮", "🍭", "🍬", "🍫", "🍿", "🍩", "🍪", "🌰", "🥜", "🫘", "🍯", "🥛", "🍼", "🫖", "☕", "🍵", "🧃", "🥤", "🧋", "🍶", "🍺", "🍻", "🥂", "🍷", "🥃", "🍸", "🍹", "🧉", "🍾", "🧊"]
    },
    activities: {
      name: "Activities",
      icon: "⚽",
      emojis: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🪃", "🥅", "⛳", "🪁", "🏹", "🎣", "🤿", "🥊", "🥋", "🎽", "🛹", "🛼", "🛷", "⛸️", "🥌", "🎿", "⛷️", "🏂", "🪂", "🏋️", "🤼", "🤸", "⛹️", "🤺", "🤾", "🏌️", "🏇", "🧘", "🏄", "🏊", "🤽", "🚣", "🧗", "🚵", "🚴", "🏆", "🥇", "🥈", "🥉", "🏅", "🎖️", "🏵️", "🎗️", "🎫", "🎟️", "🎪", "🎭", "🩰", "🎨", "🎬", "🎤", "🎧", "🎼", "🎹", "🪗", "🎷", "🎺", "🎸", "🪕", "🎻", "🪘", "🎲", "♟️", "🎯", "🎳", "🎮", "🎰", "🧩"]
    },
    objects: {
      name: "Objects",
      icon: "💡",
      emojis: ["⌚", "📱", "📲", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "🖲️", "🕹️", "🗜️", "💽", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥", "📽️", "🎞️", "📞", "☎️", "📟", "📠", "📺", "📻", "🎙️", "🎚️", "🎛️", "🧭", "⏱️", "⏲️", "⏰", "🕰️", "⌛", "⏳", "📡", "🔋", "🔌", "💡", "🔦", "🕯️", "🪔", "🧯", "🛢️", "💸", "💵", "💴", "💶", "💷", "🪙", "💰", "💳", "💎", "⚖️", "🪜", "🧰", "🪛", "🔧", "🔨", "⚒️", "🛠️", "🧲"]
    },
    symbols: {
      name: "Symbols",
      icon: "💯",
      emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️", "✝️", "☪️", "🕉️", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛐", "⛎", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓", "🆔", "⚛️", "🉑", "☢️", "☣️", "📴", "📳", "🈶", "🈚", "🈸", "🈺", "🈷️", "✴️", "🆚", "💮", "🉐", "㊙️", "㊗️", "🈴", "🈵", "🈹", "🈲", "🅰️", "🅱️", "🆎", "🆑", "🅾️", "🆘", "❌", "⭕", "🛑", "⛔", "📛", "🚫", "💯", "💢", "♨️"]
    }
  };

  return (
    <div className={`absolute bottom-14 left-0 rounded-lg shadow-lg z-10 w-64 ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
      {/* Header */}
      <div className={`flex justify-between items-center p-2 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
        <h3 className="font-medium">Emojis</h3>
        <button 
          onClick={onClose}
          className={`p-1 rounded-full hover:bg-gray-200 ${isDarkMode ? "hover:bg-gray-700" : ""}`}
        >
          <X size={16} />
        </button>
      </div>
      
      {/* Category tabs */}
      <div className={`flex overflow-x-auto p-1 ${isDarkMode ? "border-b border-gray-700" : "border-b border-gray-200"}`}>
        {Object.keys(categories).map(category => (
          <button 
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`p-2 mx-1 text-xl rounded-md transition-colors ${
              activeCategory === category 
                ? (isDarkMode ? "bg-gray-700" : "bg-gray-200") 
                : (isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100")
            }`}
            title={categories[category].name}
          >
            {categories[category].icon}
          </button>
        ))}
      </div>
      
      {/* Emoji grid */}
      <div className="p-2 h-48 overflow-y-auto">
        <div className="grid grid-cols-6 gap-1">
          {categories[activeCategory].emojis.map(emoji => (
            <button 
              key={emoji} 
              onClick={() => onEmojiClick(emoji)}
              className={`text-xl p-2 rounded hover:bg-gray-200 ${isDarkMode ? "hover:bg-gray-700" : ""}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const UserChat = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState(localStorage.getItem("chatName") || "");
  const [photo, setPhoto] = useState(localStorage.getItem("chatPhoto") || null);
  const [isDialogOpen, setIsDialogOpen] = useState(!name);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const profileFileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
        localStorage.setItem("chatPhoto", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    localStorage.removeItem("chatPhoto");
  };

  const handleStartChat = () => {
    localStorage.setItem("chatName", name);
    setIsDialogOpen(false);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: Date.now(),
        text: messageInput,
        sender: "self",
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessageInput(prev => prev + emoji);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-screen w-full mx-auto transition-all ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      {/* Name Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className={`p-6 rounded-lg shadow-lg w-80 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold mb-4 text-center">What's your name?</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-2 mb-4 rounded border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
              placeholder="Enter your name"
            />
            <div className="flex justify-center mb-4">
              {photo ? (
                <img src={photo} alt="Profile" className="h-20 w-20 rounded-full object-cover" />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="h-10 w-10 text-gray-500" />
                </div>
              )}
            </div>
            <div className="flex justify-center space-x-2 mb-4">
              <button
                onClick={() => fileInputRef.current.click()}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Camera className="h-5 w-5" />
              </button>
              {photo && (
                <button
                  onClick={handleRemovePhoto}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>
            <button
              onClick={handleStartChat}
              disabled={!name.trim()}
              className={`w-full p-2 rounded font-medium ${
                name.trim()
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Start Chatting
            </button>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className={`p-5 rounded-lg shadow-lg w-80 text-center relative ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <button 
              className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200"}`} 
              onClick={() => setIsProfileOpen(false)}
            >
              ✖
            </button>
            
            <div className="relative mx-auto mb-3 group" style={{ width: "100px", height: "100px" }}>
              {photo ? (
                <img src={photo} alt="Profile" className="h-24 w-24 rounded-full mx-auto object-cover" />
              ) : isAuthenticated ? (
                <img src={user.picture} alt="Profile" className="h-24 w-24 rounded-full mx-auto object-cover" />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gray-300 mx-auto flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-500" />
                </div>
              )}
              
              <div className="absolute bottom-0 right-0">
                <button
                  onClick={() => profileFileInputRef.current.click()}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-lg"
                >
                  <Camera className="h-4 w-4" />
                </button>
                <input
                  ref={profileFileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </div>
            </div>
            
            {photo && (
              <button
                onClick={handleRemovePhoto}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 mx-auto flex items-center justify-center mt-2 text-sm"
              >
                <Trash2 className="h-4 w-4 mr-1" /> Remove Photo
              </button>
            )}
            
            <h2 className="text-lg font-semibold mt-3">{name || (isAuthenticated ? user.name : "Guest")}</h2>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-3`}>{isAuthenticated ? user.email : "No Email Provided"}</p>
            
            {!isAuthenticated && (
              <div className="mt-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full p-2 mb-3 rounded border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                  placeholder="Change your name"
                />
                <button
                  onClick={() => {
                    localStorage.setItem("chatName", name);
                    setIsProfileOpen(false);
                  }}
                  className="w-full p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Update Profile
                </button>
              </div>
            )}

            {isAuthenticated && (
              <button 
                onClick={() => logout({ returnTo: window.location.origin })} 
                className="mt-4 p-2 rounded bg-red-500 text-white hover:bg-red-600 w-full flex items-center justify-center"
              >
                <LogOut className="h-5 w-5 mr-2" /> Sign Out
              </button>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className={`p-3 flex items-center justify-between border-b ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} shadow-sm`}>
        <div className="flex-shrink-0 cursor-pointer" onClick={() => setIsProfileOpen(true)}>
          {photo ? (
            <img src={photo} alt="User" className="h-10 w-10 rounded-full object-cover" />
          ) : isAuthenticated ? (
            <img src={user.picture} alt="User" className="h-10 w-10 rounded-full object-cover" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-500" />
            </div>
          )}
        </div>
        <div className="text-center flex-1 truncate">
          <h2 className="text-lg font-semibold">{name || (isAuthenticated ? user.name : "Guest")}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-full transition ${isDarkMode ? "bg-gray-700 text-yellow-300" : "bg-gray-200 text-gray-700"}`}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {isAuthenticated && (
            <button 
              onClick={() => logout({ returnTo: window.location.origin })} 
              className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef} 
        className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className={`text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              No messages yet. Start a conversation!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "self" ? "justify-end" : "justify-start"}`}>
              <div 
                className={`max-w-[80%] px-4 py-3 rounded-xl shadow-sm ${
                  message.sender === "self" 
                    ? "bg-blue-500 text-white rounded-tr-none" 
                    : isDarkMode 
                      ? "bg-gray-800 text-white rounded-tl-none" 
                      : "bg-white text-gray-800 rounded-tl-none"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === "self" ? "text-blue-100" : isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className={`p-3 border-t ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        <div className="flex items-end space-x-2">
          <button className={`p-2 rounded-full ${isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}>
            <Paperclip className="h-5 w-5" />
          </button>
          <div className={`flex-1 rounded-lg border ${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"} overflow-hidden relative`}>
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className={`w-full p-3 outline-none resize-none ${isDarkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-gray-100 placeholder-gray-500"}`}
              rows={1}
              style={{ maxHeight: '120px', minHeight: '40px' }}
            />
            <div className={`flex justify-between items-center px-3 py-2 ${isDarkMode ? "border-t border-gray-600" : "border-t border-gray-200"}`}>
              <div className="relative" ref={emojiPickerRef}>
                <button 
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className={`p-1 rounded-full ${
                    showEmojiPicker 
                      ? "bg-blue-100 text-blue-500" 
                      : isDarkMode 
                        ? "text-gray-400 hover:text-gray-300" 
                        : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Smile className="h-5 w-5" />
                </button>
                {showEmojiPicker && (
                  <EmojiPicker 
                    onEmojiClick={handleEmojiClick} 
                    isDarkMode={isDarkMode} 
                    onClose={() => setShowEmojiPicker(false)}
                  />
                )}
              </div>
              <small className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Press Enter to send
              </small>
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className={`p-3 rounded-full ${
              messageInput.trim()
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : isDarkMode 
                  ? "bg-gray-700 text-gray-500" 
                  : "bg-gray-200 text-gray-400"
            } transition-colors`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserChat;