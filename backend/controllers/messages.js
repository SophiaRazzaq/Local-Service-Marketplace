const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Get all chats for a user
// @route   GET /api/messages/chats
// @access  Private
exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: { $in: [req.user._id] }
    })
      .populate('participants', 'name profileImage')
      .populate('booking', 'service')
      .populate({
        path: 'booking',
        populate: {
          path: 'service',
          select: 'title'
        }
      })
      .sort({ updatedAt: -1 });
    
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get messages for a chat
// @route   GET /api/messages/:chatId
// @access  Private
exports.getMessages = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    // Check if user is part of the chat
    if (!chat.participants.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'name profileImage')
      .sort({ createdAt: 1 });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
exports.sendMessage = async (req, res) => {
  try {
    const { chatId, text, attachments } = req.body;
    
    const chat = await Chat.findById(chatId);
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    // Check if user is part of the chat
    if (!chat.participants.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const message = await Message.create({
      chat: chatId,
      sender: req.user._id,
      text,
      attachments,
      readBy: [{ user: req.user._id, readAt: Date.now() }]
    });
    
    // Update last message in chat
    chat.lastMessage = {
      text,
      sender: req.user._id,
      timestamp: Date.now()
    };
    
    await chat.save();
    
    const populatedMessage = await Message.findById(message._id).populate(
      'sender',
      'name profileImage'
    );
    
    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};