const mongoose = require('mongoose');
const equipmentSchema = new mongoose.Schema({
  equipmentId: { type: String, required: true, unique: true },
  equipmentName: { type: String, required: true },
  brand: { type: String, required: true },
  condition: { type: String, required: true },
  dailyRate: { type: Number, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Equipment', equipmentSchema);
