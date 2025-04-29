const express = require('express');
const { getServices, getServiceById, createService } = require('../controllers/services');
const { protect, provider } = require('../middleware/auth');

const router = express.Router();

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', protect, provider, createService);

module.exports = router;