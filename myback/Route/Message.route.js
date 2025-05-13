import express from 'express'
const router = express.Router();
import messageController from '../controllers/messageController';
import { authenticate } from '../middleware/auth'; // Adjust path as needed

// Apply authentication middleware to all routes
router.use(authenticate);

// Get conversation history with another user
router.get('/history/:withUserId', messageController.getMessages);

// Get unread messages (for admins)
router.get('/unread', messageController.getUnreadMessages);

// Get contacts list
router.get('/contacts', messageController.getContacts);

module.exports = router;