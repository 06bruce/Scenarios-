const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/SFPS')
  .then(() => console.log('Connected to MongoDB: SFPS'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.use('/api/students', require('./routes/students'));
app.use('/api/feestructures', require('./routes/feestructures'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
