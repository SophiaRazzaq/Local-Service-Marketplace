import express, { Router } from 'express';
import { getChats, getMessages, sendMessage } from '../controllers/messages';
import { protect } from '../middleware/auth';

const router: Router = express.Router();

router.get('/chats', protect, getChats);
router.get('/:chatId', protect, getMessages);
router.post('/', protect, sendMessage);

export default router;
