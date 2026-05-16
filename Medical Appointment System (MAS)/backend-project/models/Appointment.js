const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true, unique: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  diagnosis: { type: String, required: true },
  status: { type: String, required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true }
}, { timestamps: true });
module.exports = mongoose.model('Appointment', appointmentSchema);
