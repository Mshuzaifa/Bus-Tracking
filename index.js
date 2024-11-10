const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const busRoutes = require('./routes/busRoutes');
const studentRoutes = require('./routes/studentRoutes');
const cors = require('cors');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Use CORS middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/bus', busRoutes);
app.use('/api/student', studentRoutes);
app.get("/", (req, res) => {
  res.status(200).json({
    "status" : "ok"
  })
})
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
