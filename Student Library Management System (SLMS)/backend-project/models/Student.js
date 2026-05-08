const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  className: { type: String, required: true },
  telephone: { type: String, required: true },
  address: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
