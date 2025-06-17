// controllers/messageController.js
import Message from '../models/Message.module.js';
import User from '../models/users.module.js';

// Get conversation history between two users
exports.getMessages = async (req, res) => {
  try {
    const { userId } = req;
    const { withUserId } = req.params;
    
    // Check if the current user is an admin or is trying to get messages with an admin
    const otherUser = await User.findById(withUserId);
    const currentUser = await User.findById(userId);
    
    if (!otherUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Non-admin users can only message admins
    if (!currentUser.isAdmin && !otherUser.isAdmin) {
      return res.status(403).json({ message: 'You can only view messages with admins' });
    }
    
    // Get messages between the two users
    const messages = await Message.find({
      $or: [
        { senderId: userId, recipientId: withUserId },
        { senderId: withUserId, recipientId: userId }
      ]
    }).sort({ createdAt: 1 });
    
    // Mark messages as read if current user is the recipient
    await Message.updateMany(
      { senderId: withUserId, recipientId: userId, read: false },
      { read: true }
    );
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get list of users with unread messages (for admins)
exports.getUnreadMessages = async (req, res) => {
  try {
    const { userId } = req;
    
    // Check if user is admin
    const user = await User.findById(userId);
    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    // Get distinct senders with unread messages
    const unreadMessages = await Message.aggregate([
      { $match: { recipientId: userId, read: false } },
      { $group: { _id: '$senderId', count: { $sum: 1 } } }
    ]);
    
    // Get user details for each sender
    const userPromises = unreadMessages.map(async (msg) => {
      const sender = await User.findById(msg._id, 'username email');
      return {
        userId: msg._id,
        username: sender ? (sender.username || sender.email) : 'Unknown User',
        unreadCount: msg.count
      };
    });
    
    const users = await Promise.all(userPromises);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get list of all chat contacts
exports.getContacts = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    
    let contacts;
    
    if (user.isAdmin) {
      // Admins can see all users they've chatted with
      const conversations = await Message.aggregate([
        {
          $match: {
            $or: [{ senderId: userId }, { recipientId: userId }]
          }
        },
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ['$senderId', userId] },
                '$recipientId',
                '$senderId'
              ]
            }
          }
        }
      ]);
      
      const contactIds = conversations.map(c => c._id);
      contacts = await User.find(
        { _id: { $in: contactIds } },
        'username email isAdmin'
      );
    } else {
      // Regular users can only see admins
      contacts = await User.find(
        { isAdmin: true },
        'username email'
      );
    }
    
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};