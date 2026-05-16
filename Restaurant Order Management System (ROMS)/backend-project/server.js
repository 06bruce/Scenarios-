const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ROMS')
  .then(() => console.log('Connected to MongoDB: ROMS'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.use('/api/customers', require('./routes/customers'));
app.use('/api/menuitems', require('./routes/menuitems'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
