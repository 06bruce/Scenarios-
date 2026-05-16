const mongoose = require('mongoose');
const farmerSchema = new mongoose.Schema({
  farmerId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  telephone: { type: String, required: true },
  farmLocation: { type: String, required: true },
  gender: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Farmer', farmerSchema);
