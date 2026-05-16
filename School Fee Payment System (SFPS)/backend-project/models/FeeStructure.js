const mongoose = require('mongoose');
const feeStructureSchema = new mongoose.Schema({
  feeId: { type: String, required: true, unique: true },
  className: { type: String, required: true },
  termName: { type: String, required: true },
  amount: { type: Number, required: true },
  academicYear: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('FeeStructure', feeStructureSchema);
