const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/IMS')
  .then(() => console.log('Connected to MongoDB: IMS'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/stockmovements', require('./routes/stockmovements'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
