// routes/statisticsRoutes.js
const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/statistics', authMiddleware.isAuthenticated, statisticsController.getStatistics);
router.post('/statistics/user', authMiddleware.isAuthenticated, statisticsController.getUserStatistics);

module.exports = router;
