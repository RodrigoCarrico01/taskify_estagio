const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/tasks', authMiddleware.isAuthenticated, taskController.getTasks);
router.get('/tasks/details/:submitCode', authMiddleware.isAuthenticated, taskController.getTaskDescription);

module.exports = router;
