// controllers/studentController.js

const StudentLocation = require('../models/studentLocation.model');

exports.getStudentLocation = async (req, res) => {
  try {
    const studentId = req.user.id; // Assuming the student ID is available from the token
    const location = await StudentLocation.findOne({ studentId });

    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    res.json(location);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


// controllers/studentController.js

exports.updateStudentLocation = async (req, res) => {
    try {
      const studentId = req.user.id; // Assuming the student ID is available from the token
      const { latitude, longitude } = req.body;
  
      if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and Longitude are required' });
      }
  
      // Upsert: Update if exists, create if not
      const location = await StudentLocation.findOneAndUpdate(
        { studentId },
        { latitude, longitude, timestamp: Date.now() },
        { new: true, upsert: true }
      );
  
      res.json(location);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
