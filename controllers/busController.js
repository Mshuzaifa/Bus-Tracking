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

  if(!busDetails) {
    res.status(404).json({
      "error" : "Bus Id Not Found"
    })
  }
  res.status(200).send(busDetails);
}

exports.getAvailableBuses = async (req, res) => {
  const busses = await BusLocation.find();
  return res.status(200).json(busses);
}

exports.stopBus = async (req, res) => {
  const busId = req.params.busId;
  
  // Find the bus details by busId
  const busDetails = await BusLocation.findOne({ busId });

  if (!busDetails) {
    return res.status(404).json({
      error: "Bus Id Not Found"
    });
  }

  // Delete the bus entry based on busId
  const result = await BusLocation.deleteOne({ busId });

  // If no document was deleted, it means the busId did not exist
  if (result.deletedCount === 0) {
    return res.status(404).json({
      error: "Bus Id Not Found"
    });
  }

  // Success response
  return res.status(200).json({
    message: "Success: Tracking stopped"
  });
};

