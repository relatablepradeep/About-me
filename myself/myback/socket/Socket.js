// socket/index.js
import {Server} from 'socket.io'
import jwt from 'jsonwebtoken'
import  User from '../models/users.module.js' // Adjust path as needed

// Store active connections
const activeUsers = new Map(); // userId -> socketId
const activeAdmins = new Map(); // adminId -> socketId

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Your frontend URL
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error: Token required'));
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return next(new Error('Authentication error: User not found'));
      }

      // Attach user data to socket
      socket.userData = {
        userId: user._id.toString(),
        isAdmin: user.isAdmin || false,
        username: user.username || user.email
      };

      next();
    } catch (error) {
      next(new Error('Authentication error: ' + error.message));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}, User ID: ${socket.userData.userId}`);
    
    // Store connection based on user role
    if (socket.userData.isAdmin) {
      activeAdmins.set(socket.userData.userId, socket.id);
    } else {
      activeUsers.set(socket.userData.userId, socket.id);
    }

    // Send online status to all admins
    sendOnlineStatusToAdmins(io);

    // Handle private messages
    socket.on('private-message', ({ recipientId, message }) => {
      const senderId = socket.userData.userId;
      const senderName = socket.userData.username;
      const isAdmin = socket.userData.isAdmin;
      
      // Check permissions
      if (!isAdmin && !recipientIsAdmin(recipientId)) {
        // Non-admin users can only message admins
        socket.emit('error', { message: 'You can only message admins' });
        return;
      }

      // Save message to database (implement this in your model)
      saveMessage(senderId, recipientId, message);
      
      // Find recipient socket
      const recipientSocketId = getSocketId(recipientId);
      if (recipientSocketId) {
        // Send message to recipient
        io.to(recipientSocketId).emit('private-message', {
          senderId,
          senderName,
          message,
          timestamp: new Date()
        });
      }
      
      // Confirm message delivery to sender
      socket.emit('message-delivered', {
        recipientId,
        message,
        timestamp: new Date()
      });
    });

    // Handle message history request
    socket.on('get-message-history', async ({ withUserId }) => {
      const userId = socket.userData.userId;
      const isAdmin = socket.userData.isAdmin;

      // Check permissions
      if (!isAdmin && !recipientIsAdmin(withUserId)) {
        socket.emit('error', { message: 'You can only view messages with admins' });
        return;
      }

      // Get message history (implement this in your model)
      const messages = await getMessageHistory(userId, withUserId);
      socket.emit('message-history', { userId: withUserId, messages });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}, User ID: ${socket.userData.userId}`);
      
      if (socket.userData.isAdmin) {
        activeAdmins.delete(socket.userData.userId);
      } else {
        activeUsers.delete(socket.userData.userId);
      }
      
      // Update online status for admins
      sendOnlineStatusToAdmins(io);
    });
  });

  return io;
}

// Helper functions
function getSocketId(userId) {
  return activeUsers.get(userId) || activeAdmins.get(userId);
}

function recipientIsAdmin(userId) {
  return activeAdmins.has(userId);
}

function sendOnlineStatusToAdmins(io) {
  const onlineUsers = Array.from(activeUsers.keys());
  
  // Send to all admins
  activeAdmins.forEach((socketId) => {
    io.to(socketId).emit('online-users', onlineUsers);
  });
}

async function saveMessage(senderId, recipientId, content) {
  const Message = require('../models/Message');
  try {
    const message = await Message.create({ 
      senderId, 
      recipientId, 
      content 
    });
    return message;
  } catch (error) {
    console.error('Error saving message:', error);
    return null;
  }
}

async function getMessageHistory(userId1, userId2) {
  const Message = require('../models/Message');
  try {
    return await Message.find({ 
      $or: [
        { senderId: userId1, recipientId: userId2 },
        { senderId: userId2, recipientId: userId1 }
      ]
    }).sort({ createdAt: 1 });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    return [];
  }
}

module.exports = { initializeSocket };