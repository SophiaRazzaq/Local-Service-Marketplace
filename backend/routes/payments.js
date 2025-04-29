const express = require('express');
const { protect } = require('../middleware/auth');
const Booking = require('../models/Booking');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

// @desc    Create payment intent
// @route   POST /api/payments/create-payment-intent
// @access  Private
router.post('/create-payment-intent', protect, async (req, res) => {
  try {
    const { bookingId } = req.body;
    
    // Find booking
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if booking belongs to user
    if (booking.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: booking.price * 100, // Stripe works with cents
      currency: 'usd',
      metadata: {
        bookingId: booking._id.toString()
      }
    });
    
    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update payment status
// @route   PUT /api/payments/update-status/:bookingId
// @access  Private
router.put('/update-status/:bookingId', protect, async (req, res) => {
  try {
    const { paymentStatus, paymentMethod } = req.body;
    
    const booking = await Booking.findById(req.params.bookingId);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    booking.paymentStatus = paymentStatus;
    booking.paymentMethod = paymentMethod;
    
    if (paymentStatus === 'paid') {
      booking.status = 'confirmed';
    }
    
    const updatedBooking = await booking.save();
    
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;