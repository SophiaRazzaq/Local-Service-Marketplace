const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  pricingUnit: {
    type: String,
    enum: ['hourly', 'fixed', 'per day'],
    default: 'hourly'
  },
  images: [{
    type: String
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);