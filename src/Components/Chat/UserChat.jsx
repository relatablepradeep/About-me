import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, User, Send, Image, Mic, Paperclip, File, X } from 'lucide-react';
// Import Socket.io client
// import { io } from 'socket.io-client';

const UserChat = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  
  // Socket.io reference
  // const socketRef = useRef();
  
  // Initialize Socket.io connection
  useEffect(() => {
    // SOCKET.IO SETUP - UNCOMMENT AND MODIFY THIS SECTION
    // socketRef.current = io('http://your-server-url');
    
    // Listen for incoming messages
    // socketRef.current.on('receiveMessage', (message) => {
    //   setMessages(prevMessages => [...prevMessages, {
    //     ...message,
    //     sender: 'other',
    //     timestamp: new Date(message.timestamp)
    //   }]);
    // });
    
    // Clean up on component unmount
    // return () => {
    //   socketRef.current.disconnect();
    // };
  }, []);
  
  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setSelectedFile(file);
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // For non-image files (like PDFs)
      setFilePreview(null);
    }
  };
  
  const removeSelectedFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) {
      return <Image className="h-6 w-6" />;
    } else if (fileType === 'application/pdf') {
      return <File className="h-6 w-6 text-red-500" />;
    } else if (fileType.startsWith('video/')) {
      return <File className="h-6 w-6 text-blue-500" />;
    } else if (fileType.startsWith('audio/')) {
      return <Mic className="h-6 w-6 text-purple-500" />;
    } else {
      return <File className="h-6 w-6 text-gray-500" />;
    }
  };
  
  const getFileExtension = (filename) => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  };
  
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  const sendMessage = () => {
    if ((!messageInput.trim() && !selectedFile)) return;
    
    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: "self",
      timestamp: new Date(),
      file: selectedFile ? {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
        url: filePreview || 'file-url-placeholder' // In real implementation, this would be the uploaded file URL
      } : null
    };
    
    // Add message to local state
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // SOCKET.IO EMIT - UNCOMMENT AND MODIFY THIS SECTION
    // If there's a file, you'd typically upload it to your server/cloud storage first
    // const formData = new FormData();
    // if (selectedFile) {
    //   formData.append('file', selectedFile);
    //   
    //   // Upload file and get URL
    //   // fetch('your-upload-url', {
    //   //   method: 'POST',
    //   //   body: formData
    //   // })
    //   // .then(res => res.json())
    //   // .then(data => {
    //   //   // Now emit the message with the file URL
    //   //   socketRef.current.emit('sendMessage', {
    //   //     text: messageInput,
    //   //     userId: 'your-user-id',
    //   //     recipientId: 'recipient-id',
    //   //     timestamp: new Date(),
    //   //     file: {
    //   //       name: selectedFile.name,
    //   //       type: selectedFile.type,
    //   //       size: selectedFile.size,
    //   //       url: data.fileUrl
    //   //     }
    //   //   });
    //   // });
    // } else {
    //   // Send text-only message
    //   // socketRef.current.emit('sendMessage', {
    //   //   text: messageInput,
    //   //   userId: 'your-user-id',
    //   //   recipientId: 'recipient-id',
    //   //   timestamp: new Date()
    //   // });
    // }
    
    // Reset inputs
    setMessageInput('');
    removeSelectedFile();
  };
  
  // Function to format dates and add dividers
  const formatMessageDate = (date) => {
    const now = new Date();
    
    // For messages less than a minute old
    const diffSeconds = Math.floor((now - date) / 1000);
    if (diffSeconds < 60) {
      return "Just now";
    }
    
    // For messages less than an hour old
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    }
    
    // Return time in 12-hour format (e.g., 2:30 PM)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Group messages by date for time dividers
  const getMessageGroups = () => {
    let currentDay = null;
    const groups = [];
    
    messages.forEach((message) => {
      const messageDay = new Date(message.timestamp).toDateString();
      
      if (messageDay !== currentDay) {
        currentDay = messageDay;
        
        const now = new Date().toDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        let dateLabel;
        if (messageDay === now) {
          dateLabel = "Today";
        } else if (messageDay === yesterday.toDateString()) {
          dateLabel = "Yesterday";
        } else {
          const messageDate = new Date(message.timestamp);
          const daysDiff = Math.floor((now - messageDate) / (1000 * 60 * 60 * 24));
          
          if (daysDiff < 7) {
            // Within the last week
            dateLabel = messageDate.toLocaleDateString([], { weekday: 'long' });
          } else {
            // Older than a week
            dateLabel = messageDate.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
          }
        }
        
        groups.push({ type: 'divider', label: dateLabel });
      }
      
      groups.push({ type: 'message', message });
    });
    
    return groups;
  };
  
  const messageGroups = getMessageGroups();
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  // Handle clicks on file attachments
  const handleFileClick = (fileUrl, fileType, fileName) => {
    if (fileType.startsWith('image/')) {
      // Open image in a new tab or modal
      window.open(fileUrl, '_blank');
    } else {
      // Download non-image files
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  // Render file attachment in message
  const renderFileAttachment = (file) => {
    if (!file) return null;
    
    if (file.type.startsWith('image/')) {
      return (
        <div className="mt-2 max-w-xs sm:max-w-sm overflow-hidden rounded-lg cursor-pointer" onClick={() => handleFileClick(file.url, file.type, file.name)}>
          <img src={file.url} alt={file.name} className="max-w-full h-auto" />
        </div>
      );
    } else {
      return (
        <div 
          className={`mt-2 p-3 rounded-lg flex items-center cursor-pointer ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
          onClick={() => handleFileClick(file.url, file.type, file.name)}
        >
          <div className="mr-3">
            {getFileIcon(file.type)}
          </div>
          <div className="overflow-hidden">
            <p className="truncate font-medium">{file.name}</p>
            <p className="text-xs opacity-75">{formatFileSize(file.size)}</p>
          </div>
        </div>
      );
    }
  };
  
  return (
    <div className={`flex flex-col h-screen w-full max-w-screen-2xl mx-auto ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Header */}
      <div className={`p-2 sm:p-4 flex items-center justify-between border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex-shrink-0">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <User className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
          </div>
        </div>
        
        <div className="flex-1 text-center px-2">
          <h2 className="text-base sm:text-lg font-semibold truncate">John Doe</h2>
        </div>
        
        <div className="flex-shrink-0">
          <button 
            onClick={toggleTheme}
            className={`p-1 sm:p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
      </div>
      
      {/* Chat Area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No messages yet. Start a conversation!
            </p>
          </div>
        ) : (
          messageGroups.map((group, index) => (
            group.type === 'divider' ? (
              <div key={`divider-${index}`} className="flex justify-center my-2 sm:my-4">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                  {group.label}
                </div>
              </div>
            ) : (
              <div 
                key={`msg-${group.message.id}`} 
                className={`flex ${group.message.sender === 'self' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-3 py-2 rounded-2xl ${
                    group.message.sender === 'self' 
                      ? isDarkMode ? 'bg-blue-600' : 'bg-blue-500 text-white' 
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                >
                  {group.message.text && (
                    <p className="text-sm sm:text-base break-words">{group.message.text}</p>
                  )}
                  
                  {group.message.file && renderFileAttachment(group.message.file)}
                  
                  <p className={`text-xs mt-1 text-right ${
                    group.message.sender === 'self' 
                      ? 'text-blue-100' 
                      : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {formatMessageDate(group.message.timestamp)}
                  </p>
                </div>
              </div>
            )
          ))
        )}
      </div>
      
      {/* File Preview Area (before sending) */}
      {selectedFile && (
        <div className={`px-4 py-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-start space-x-3">
            <div className={`flex-1 flex items-center p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              {filePreview ? (
                <div className="w-12 h-12 mr-3 flex-shrink-0 rounded overflow-hidden">
                  <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 mr-3 flex-shrink-0 flex items-center justify-center rounded bg-gray-300">
                  {getFileIcon(selectedFile.type)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                <p className="text-xs opacity-75">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <button 
              onClick={removeSelectedFile}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      
      {/* Message Input Area */}
      <div className={`p-2 sm:p-4 border-t ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            className="hidden"
            accept="image/*,application/pdf,video/*,audio/*"
          />
          
          <button 
            onClick={() => fileInputRef.current.click()}
            className={`p-1 sm:p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}
          >
            <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
              className={`w-full resize-none py-2 px-3 sm:p-3 pr-16 sm:pr-24 rounded-full text-sm sm:text-base focus:outline-none ${
                isDarkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500'
              }`}
              style={{ maxHeight: '120px', minHeight: '40px' }}
            />
            
            <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 flex space-x-1 sm:space-x-2">
              <button className={`p-1 rounded-full ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                <Mic className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button 
                onClick={() => fileInputRef.current.click()}
                className={`p-1 rounded-full ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}
              >
                <Image className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
          
          <button 
            onClick={sendMessage}
            className={`p-2 sm:p-3 rounded-full ${
              (!messageInput.trim() && !selectedFile) 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-500'
            } text-white`}
            disabled={!messageInput.trim() && !selectedFile}
          >
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserChat;