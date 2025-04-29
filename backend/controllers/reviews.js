const Review = require('../models/Review');
const Booking = require('../models/Booking');
const Provider = require('../models/Provider');
const Service = require('../models/Service');

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment, images } = req.body;
    
    // Find booking
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if booking belongs to user
    if (booking.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Check if booking is completed
    if (booking.status !== 'completed') {
      return res.status(400).json({ message: 'Booking must be completed to leave a review' });
    }
    
    // Check if review already exists
    const existingReview = await Review.findOne({ booking: bookingId });
    
    if (existingReview) {
      return res.status(400).json({ message: 'Review already exists for this booking' });
    }
    
    // Create review
    const review = await Review.create({
      booking: bookingId,
      customer: req.user._id,
      provider: booking.provider,
      service: booking.service,
      rating,
      comment,
      images
    });
    
    // Update provider's average rating
    const providerReviews = await Review.find({ provider: booking.provider });
    
    const averageRating = providerReviews.reduce((acc, item) => acc + item.rating, 0) / providerReviews.length;
    
    await Provider.findByIdAndUpdate(booking.provider, {
      averageRating,
      totalReviews: providerReviews.length
    });
    
    // Update service's average rating
    const serviceReviews = await Review.find({ service: booking.service });
    
    const serviceAverageRating = serviceReviews.reduce((acc, item) => acc + item.rating, 0) / serviceReviews.length;
    
    await Service.findByIdAndUpdate(booking.service, {
      averageRating: serviceAverageRating,
      totalReviews: serviceReviews.length
    });
    
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get reviews for a provider
// @route   GET /api/reviews/provider/:providerId
// @access  Public
exports.getProviderReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ provider: req.params.providerId })
      .populate('customer', 'name profileImage')
      .populate('service', 'title')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};