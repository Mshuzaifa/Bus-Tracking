const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


// Register a new user
exports.userregister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Validation errors', errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  // Validate email domain with role consistency
  if (role === 'student' && !email.endsWith('@vitapstudent.ac.in')) {
    return res.status(400).json({ success: false, message: 'Student email must end with @vitapstudent.ac.in' });
  }

  if (role === 'driver' && !email.endsWith('@vitapdriver.ac.in')) {
    return res.status(400).json({ success: false, message: 'Driver email must end with @vitapdriver.ac.in' });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create new user
    user = new User({ name, email, password, role });
    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error('Token generation error:', err.message);
          return res.status(500).json({ success: false, message: 'Token generation failed' });
        }
        res.status(200).json({ success: true, message: 'User registered successfully', token });
      }
    );
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Registering a Driver Separately
exports.driverregister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

// Check if email and role are provided
if (!email || !role) {
  return res.status(400).json({ error: 'Email and role must be provided' });
}

// Validate domain for driver
if (!email.endsWith('@vitapbusdriver.ac.in')) {
  return res.status(400).json({ error: 'Invalid email domain for driver' });
}

// Validate email domain with role consistency
if (email.endsWith('@vitapbusdriver.ac.in') && role !== 'driver') {
  return res.status(400).json({ error: 'Role mismatch with email domain' });
}



  try {
    // Check if Driver already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'Driver already exists' });
    }

    // Create new user
    user = new User({ name, email, password, role });
    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ msg: 'Driver registered successfully', token });
      }
    );
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, role: user.role });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
