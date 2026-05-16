const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/HRBS')
  .then(() => console.log('Connected to MongoDB: HRBS'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.use('/api/guests', require('./routes/guests'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
