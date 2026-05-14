const mongoose = require('mongoose');
const passengerSchema = new mongoose.Schema({
  passengerId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  idNumber: { type: String, required: true },
  telephone: { type: String, required: true },
  gender: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Passenger', passengerSchema);
