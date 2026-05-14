const mongoose = require('mongoose');
const routeSchema = new mongoose.Schema({
  routeId: { type: String, required: true, unique: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  distance: { type: String, required: true },
  estimatedDuration: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Route', routeSchema);
