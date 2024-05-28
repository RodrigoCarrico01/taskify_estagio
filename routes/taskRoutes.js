// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/tasks', authMiddleware.isAuthenticated, taskController.getTasks);

module.exports = router;