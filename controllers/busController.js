const BusLocation = require('../models/busLocation');

exports.updateLocation = async (req, res) => {
  const { busId, phoneNumber, latitude, longitude } = req.body;
  // const busId = req.user.id; // Assuming busId is the driver's user ID

  try {
    // Update the location in the database
    let busLocation = await BusLocation.findOne({ busId });
    if (busLocation) {
      busLocation.latitude = latitude;
      busLocation.longitude = longitude;
    } else {
      busLocation = new BusLocation({ busId, phoneNumber, latitude, longitude });
    }
    await busLocation.save();

    // Broadcast the new location to all connected clients (students)
    // req.io.emit('busLocationUpdate', { latitude, longitude });

    res.status(200).json({ msg: 'Tracking started' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateOnlyLocation = async (req, res) => {
  const { latitude, longitude } = req.body;
  const busId = req.params.busId; // Assuming busId is the driver's user ID

  try {
    // Update the location in the database
    let busLocation = await BusLocation.findOne({ busId });
    if (busLocation) {
      busLocation.latitude = latitude;
      busLocation.longitude = longitude;
    } else {
      busLocation = new BusLocation({ busId, phoneNumber, latitude, longitude });
    }
    await busLocation.save();

    // Broadcast the new location to all connected clients (students)
    // req.io.emit('busLocationUpdate', { latitude, longitude });

    res.status(200).json({ msg: 'Location updated' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBusLocation = async (req, res) => {
  const busId = req.params.busId;
  const busDetails = await BusLocation.findOne({ busId })
  res.status(200).send(busDetails);
}

exports.getAvailableBuses = async (req, res) => {
  const busses = await BusLocation.find();
  return res.status(200).json(busses);
}
