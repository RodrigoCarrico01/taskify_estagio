// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', authController.sendMagicLink);
router.get('/auth/verify', authController.verifyMagicLink);
router.get('/logout', authController.logout);

router.get('/profile', authMiddleware.isAuthenticated, (req, res) => {
  res.render('profile');
});

module.exports = router;
