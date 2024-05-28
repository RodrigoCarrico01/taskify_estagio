// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware.isAuthenticated, profileController.getProfile);
router.post('/profile/update', authMiddleware.isAuthenticated, profileController.updateDisplayName);

module.exports = router;
