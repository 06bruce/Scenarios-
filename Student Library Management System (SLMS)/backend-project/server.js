const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/SLMS')
  .then(() => console.log('Connected to MongoDB: SLMS'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/students', require('./routes/students'));
app.use('/api/books', require('./routes/books'));
app.use('/api/borrowings', require('./routes/borrowings'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
