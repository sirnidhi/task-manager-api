const express = require('express');
const { body } = require('express-validator');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// Validation rules
const signupValidation = [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

// Routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

module.exports = router;