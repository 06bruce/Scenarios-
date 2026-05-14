const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ERMS')
  .then(() => console.log('Connected to MongoDB: ERMS'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.use('/api/clients', require('./routes/clients'));
app.use('/api/equipment', require('./routes/equipment'));
app.use('/api/rentals', require('./routes/rentals'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
