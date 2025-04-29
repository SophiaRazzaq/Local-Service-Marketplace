const express = require('express');
const { createReview, getProviderReviews } = require('../controllers/reviews');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createReview);
router.get('/provider/:providerId', getProviderReviews);

module.exports = router;