const Service = require('../models/Service');
const Provider = require('../models/Provider');
const Category = require('../models/Category');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;
    
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: 'i'
          }
        }
      : {};
    
    const category = req.query.category ? { category: req.query.category } : {};
    
    const count = await Service.countDocuments({ ...keyword, ...category });
    
    const services = await Service.find({ ...keyword, ...category })
      .populate('provider', 'businessName averageRating')
      .populate('category', 'name')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });
    
    res.json({
      services,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get service by ID
// @route   GET /api/services/:id
// @access  Public
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('provider', 'businessName averageRating totalReviews user')
      .populate('category', 'name')
      .populate({
        path: 'provider',
        populate: {
          path: 'user',
          select: 'name profileImage'
        }
      });
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Provider
exports.createService = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      pricingUnit,
      images
    } = req.body;
    
    // Find provider
    const provider = await Provider.findOne({ user: req.user._id });
    
    if (!provider) {
      return res.status(404).json({ message: 'Provider profile not found' });
    }
    
    const service = await Service.create({
      title,
      description,
      provider: provider._id,
      category,
      price,
      pricingUnit,
      images
    });
    
    // Add service to provider's services
    provider.services.push(service._id);
    await provider.save();
    
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};