const express = require('express');
const { getAdminStats, updateOrderStatus } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/stats', protect, admin, getAdminStats);
router.put('/orders/:id', protect, admin, updateOrderStatus);

module.exports = router;