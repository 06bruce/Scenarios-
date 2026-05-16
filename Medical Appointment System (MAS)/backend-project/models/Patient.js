const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
  patientId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  telephone: { type: String, required: true },
  address: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Patient', patientSchema);
