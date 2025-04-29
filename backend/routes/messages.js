const express = require('express');
const { getChats, getMessages, sendMessage } = require('../controllers/messages');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/chats', protect, getChats);
router.get('/:chatId', protect, getMessages);
router.post('/', protect, sendMessage);

module.exports = router;