const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');

const router = express.Router();

// Validation rules
const taskValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('dueDate').optional().isISO8601().withMessage('Invalid due date format')
];

// All routes require authentication
router.use(auth);

// Routes
router.get('/stats', getTaskStats);
router.get('/', getTasks);
router.post('/', taskValidation, createTask);
router.get('/:id', getTask);
router.put('/:id', taskValidation, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;