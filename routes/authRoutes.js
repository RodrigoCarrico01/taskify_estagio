// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/login', authMiddleware.isNotAuthenticated, (req, res) => {
  res.render('login');
});

router.post('/login', authController.sendMagicLink);
router.get('/auth/verify', authController.verifyMagicLink);
router.get('/logout', authController.logout);

router.get('/profile', authMiddleware.isAuthenticated, authController.getProfile);
router.post('/profile/update', authMiddleware.isAuthenticated, authController.updateDisplayName);

module.exports = router;
