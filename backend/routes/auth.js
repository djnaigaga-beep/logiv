const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const validateCountry = require('../middleware/validateCountry');

// Signup route
router.post('/signup', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('gender').isIn(['male', 'female']),
  body('country').notEmpty(),
  body('countryCode').notEmpty(),
  body('phoneNumber').isMobilePhone(),
  body('dateOfBirth').isISO8601()
], validateCountry, authController.signup);

// Login route
router.post('/login', authController.login);

// Verify token
router.get('/verify', auth, authController.verifyToken);

module.exports = router;
