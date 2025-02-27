import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Paperclip, Send, Mic, X, MoreVertical, ChevronLeft, Image, Video, FilePlus, Smile } from 'lucide-react';

// This would typically come from your Redux store
const initialUsers = [
  { id: 1, name: 'John Doe', avatar: '/api/placeholder/40/40', lastSeen: 'Online', email: 'john.doe@example.com', phone: '+1 234 567 8901', address: 'New York, USA', unread: 3 },
];

const initialMessages = {
  1: [{ id: 1, sender: 'user', content: 'Hello there!', time: '10:30 AM' }],
};

const AdminChat = ({ 
  // Props that would connect to your Redux/Socket.io implementation
  users = initialUsers, 
  messages = initialMessages,
  onSendMessage = () => {},
  onReadMessages = () => {},
  onUploadFile = () => {},
  onSendVoiceNote = () => {},
}) => {
  // State management
  const [darkMode, setDarkMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [localMessages, setLocalMessages] = useState(messages);
  const [messageInput, setMessageInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  // Refs
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  // Sample emojis - in a real app, you'd use a proper emoji picker library
  const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', 
                 '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
                 '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
                 '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣'];
  
  // Update local messages when prop messages change (from Redux)
  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [localMessages, selectedUser]);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  // Select a user to chat with
  const selectUser = (user) => {
    setSelectedUser(user);
    setShowUserProfile(false);
    // In a real app, you'd dispatch an action to mark messages as read
    onReadMessages(user.id);
  };
  
  // Send a message
  const sendMessage = () => {
    if (messageInput.trim() === '' || !selectedUser) return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'admin',
      content: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // Update local state immediately for UI responsiveness
    setLocalMessages({
      ...localMessages,
      [selectedUser.id]: [...(localMessages[selectedUser.id] || []), newMessage]
    });
    
    // In a real app, you'd dispatch an action to your Redux store
    // and/or emit through Socket.io
    onSendMessage(selectedUser.id, messageInput);
    
    setMessageInput('');
  };
  
  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  // Handle voice recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would handle the actual recording
    // and when complete, call onSendVoiceNote
  };
  
  // Handle file upload
  const handleFileUpload = (type) => {
    fileInputRef.current.click();
    setShowAttachMenu(false);
    // onUploadFile would be called in the onChange of the file input
  };
  
  // Toggle user profile
  const toggleUserProfile = () => {
    setShowUserProfile(!showUserProfile);
  };
  
  // Back to user list
  const backToUserList = () => {
    setSelectedUser(null);
    setShowUserProfile(false);
  };
  
  // Add emoji to message
  const addEmoji = (emoji) => {
    setMessageInput(messageInput + emoji);
    setShowEmojiPicker(false);
  };
  
  // Handle file input change
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // In a real app, you'd dispatch an action to upload the file
    onUploadFile(selectedUser.id, file);
    
    // Reset the input
    e.target.value = null;
  };
  
  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      {/* Users sidebar */}
      <div className={`w-80 border-r ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="text-xl font-bold">Messages</h2>
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-800'}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        <div className="overflow-y-auto h-full pb-20">
          {users.map(user => (
            <div 
              key={user.id} 
              onClick={() => selectUser(user)}
              className={`flex items-center p-3 border-b cursor-pointer hover:bg-opacity-10 relative
                ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-100'}
                ${selectedUser?.id === user.id ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
            >
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-12 h-12 rounded-full mr-3"
                />
                {user.lastSeen === 'Online' && (
                  <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{user.name}</h3>
                  <span className="text-xs text-gray-500">{user.lastSeen}</span>
                </div>
                <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {localMessages[user.id]?.[localMessages[user.id].length - 1]?.content || ''}
                </p>
              </div>
              {user.unread > 0 && (
                <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {user.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat header */}
            <div className={`p-3 flex items-center justify-between border-b 
              ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'}`}>
              <div className="flex items-center">
                <button 
                  onClick={backToUserList}
                  className={`md:hidden mr-2 p-1 rounded-full 
                    ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center cursor-pointer" onClick={toggleUserProfile}>
                  <img 
                    src={selectedUser.avatar} 
                    alt={selectedUser.name} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold">{selectedUser.name}</h3>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {selectedUser.lastSeen}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
            
            {showUserProfile ? (
              /* User profile panel */
              <div className={`flex-1 p-6 overflow-y-auto flex flex-col items-center
                ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="text-center mb-8">
                  <img 
                    src={selectedUser.avatar} 
                    alt={selectedUser.name} 
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                  />
                  <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{selectedUser.lastSeen}</p>
                </div>
                
                <div className={`w-full max-w-md p-6 rounded-lg shadow-lg 
                  ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                  <h3 className="text-xl font-semibold mb-4">User Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                      <p>{selectedUser.email}</p>
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
                      <p>{selectedUser.phone}</p>
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Location</p>
                      <p>{selectedUser.address}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button 
                      onClick={() => setShowUserProfile(false)}
                      className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Back to Chat
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Chat messages */
              <div className={`flex-1 p-4 overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                {localMessages[selectedUser.id]?.map((message, index) => (
                  <div 
                    key={message.id}
                    className={`max-w-xs md:max-w-md mb-4 ${message.sender === 'admin' ? 'ml-auto' : 'mr-auto'}`}
                  >
                    <div className={`p-3 rounded-lg ${
                      message.sender === 'admin' 
                        ? (darkMode ? 'bg-blue-600' : 'bg-blue-500 text-white') 
                        : (darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200')
                    }`}>
                      {message.content}
                    </div>
                    <div className={`text-xs mt-1 ${
                      message.sender === 'admin' ? 'text-right' : ''
                    } ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {message.time}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
            
            {/* Message input */}
            {!showUserProfile && (
              <div className={`p-3 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                <div className="relative flex items-center">
                  <button 
                    onClick={() => setShowAttachMenu(!showAttachMenu)}
                    className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-500'}`}
                  >
                    <Paperclip size={20} />
                  </button>
                  
                  {showAttachMenu && (
                    <div className={`absolute bottom-12 left-0 p-2 rounded-lg shadow-lg z-10
                      ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
                      <div className="flex flex-col space-y-2">
                        <button 
                          onClick={() => handleFileUpload('image')}
                          className="flex items-center p-2 rounded hover:bg-opacity-10 hover:bg-blue-500"
                        >
                          <Image size={18} className="mr-2 text-blue-500" />
                          <span>Photo</span>
                        </button>
                        <button 
                          onClick={() => handleFileUpload('video')}
                          className="flex items-center p-2 rounded hover:bg-opacity-10 hover:bg-blue-500"
                        >
                          <Video size={18} className="mr-2 text-blue-500" />
                          <span>Video</span>
                        </button>
                        <button 
                          onClick={() => handleFileUpload('file')}
                          className="flex items-center p-2 rounded hover:bg-opacity-10 hover:bg-blue-500"
                        >
                          <FilePlus size={18} className="mr-2 text-blue-500" />
                          <span>File</span>
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileInputChange}
                  />
                  
                  <button 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-500'}`}
                  >
                    <Smile size={20} />
                  </button>
                  
                  {showEmojiPicker && (
                    <div className={`absolute bottom-12 left-10 p-2 rounded-lg shadow-lg z-10
                      ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
                      <div className="grid grid-cols-8 gap-1">
                        {emojis.map((emoji, index) => (
                          <button 
                            key={index} 
                            onClick={() => addEmoji(emoji)}
                            className="w-8 h-8 text-lg hover:bg-gray-100 hover:bg-opacity-10 rounded"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <input 
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className={`flex-1 p-2 mx-2 rounded-full 
                      ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' : 'bg-gray-100 text-gray-800 placeholder-gray-500 border-transparent'}
                      border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  
                  {messageInput.trim() === '' ? (
                    <button 
                      onClick={toggleRecording}
                      className={`p-2 rounded-full ${
                        isRecording ? 'bg-red-500 text-white' : (darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-500')
                      }`}
                    >
                      {isRecording ? <X size={20} /> : <Mic size={20} />}
                    </button>
                  ) : (
                    <button 
                      onClick={sendMessage}
                      className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                    >
                      <Send size={20} />
                    </button>
                  )}
                </div>
                {isRecording && (
                  <div className="mt-2 flex items-center justify-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Recording voice message...</span>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center
                ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <Message size={30} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your Messages</h2>
              <p className={`max-w-md ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Select a conversation from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Message icon component
const Message = ({ size = 24, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
};

export default AdminChat;