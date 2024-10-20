const express = require('express');
const { updateLocation } = require('../controllers/busController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/start', authMiddleware, roleMiddleware('driver'), (req, res) => {
  // Logic to start tracking would be here
  res.status(200).json({ msg: 'Tracking started' });
});

router.post('/stop', authMiddleware, roleMiddleware('driver'), (req, res) => {
  // Logic to stop tracking would be here
  res.status(200).json({ msg: 'Tracking stopped' });
});

router.post('/location', authMiddleware, roleMiddleware('driver'), updateLocation);

module.exports = router;
