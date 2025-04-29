const express = require('express');
const { createBooking, getBookings } = require('../controllers/bookings');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/', protect, getBookings);

module.exports = router;