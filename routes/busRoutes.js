const express = require('express');
const { updateLocation, getAvailableBuses, getBusLocation, updateOnlyLocation } = require('../controllers/busController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/start', authMiddleware, roleMiddleware('driver'), updateLocation);

router.post('/stop', authMiddleware, roleMiddleware('driver'), (req, res) => {
  // Logic to stop tracking would be here
  res.status(200).json({ msg: 'Tracking stopped' });
});

router.post('/location/:busId', authMiddleware, roleMiddleware('driver'), updateOnlyLocation);
router.get('/get-busses', getAvailableBuses);
router.get('/track-bus/:busId', getBusLocation);

module.exports = router;
