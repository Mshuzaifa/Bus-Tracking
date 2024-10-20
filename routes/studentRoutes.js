// routes/studentRoutes.js

const express = require('express');
const { getStudentLocation, updateStudentLocation } = require('../controllers/studentController');
const authmiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/location', authmiddleware, getStudentLocation);
router.post('/location', authmiddleware, updateStudentLocation); 

module.exports = router;
