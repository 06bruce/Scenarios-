const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  roomNumber: { type: String, required: true },
  roomType: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  status: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Room', roomSchema);
