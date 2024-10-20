const BusLocation = require('../models/BusLocation');

exports.updateLocation = async (req, res) => {
  const { latitude, longitude } = req.body;
  const busId = req.user.id; // Assuming busId is the driver's user ID

  try {
    // Update the location in the database
    let busLocation = await BusLocation.findOne({ busId });
    if (busLocation) {
      busLocation.latitude = latitude;
      busLocation.longitude = longitude;
    } else {
      busLocation = new BusLocation({ busId, latitude, longitude });
    }
    await busLocation.save();

    // Broadcast the new location to all connected clients (students)
    req.io.emit('busLocationUpdate', { latitude, longitude });

    res.status(200).json({ msg: 'Location updated' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
