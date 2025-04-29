const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Provider = require('../models/Provider');
const Chat = require('../models/Chat');

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const {
      serviceId,
      scheduledDate,
      scheduledTime,
      location,
      notes
    } = req.body;
    
    // Find service
    const service = await Service.findById(serviceId).populate('provider');
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Create booking
    const booking = await Booking.create({
      customer: req.user._id,
      service: serviceId,
      provider: service.provider._id,
      scheduledDate,
      scheduledTime,
      location,
      notes,
      price: service.price
    });
    
    // Create chat between customer and provider
    await Chat.create({
      participants: [req.user._id, service.provider.user],
      booking: booking._id
    });
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get bookings by user
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res) => {
  try {
    let bookings;
    
    if (req.user.role === 'customer') {
      bookings = await Booking.find({ customer: req.user._id })
        .populate('service', 'title price')
        .populate({
          path: 'provider',
          select: 'businessName',
          populate: {
            path: 'user',
            select: 'name'
          }
        })
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'provider') {
      const provider = await Provider.findOne({ user: req.user._id });
      
      if (!provider) {
        return res.status(404).json({ message: 'Provider profile not found' });
      }
      
      bookings = await Booking.find({ provider: provider._id })
        .populate('service', 'title price')
        .populate('customer', 'name')
        .sort({ createdAt: -1 });
    }
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};