const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
  doctorId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialization: { type: String, required: true },
  telephone: { type: String, required: true },
  gender: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Doctor', doctorSchema);
