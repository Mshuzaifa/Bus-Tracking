const express = require('express');
const { check } = require('express-validator');
const { userregister, driverregister,login } = require('../controllers/authController');

const router = express.Router();

router.post(
  '/userregister',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  userregister
);

router.post(
  '/driverregister',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  driverregister
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

module.exports = router;
