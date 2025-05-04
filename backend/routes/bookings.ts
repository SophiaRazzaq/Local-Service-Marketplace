import express, { Router } from 'express';
import { createBooking, getBookings } from '../controllers/bookings';
import { protect } from '../middleware/auth';

const router: Router = express.Router();

router.post('/', protect, createBooking);
router.get('/', protect, getBookings);

export default router;
