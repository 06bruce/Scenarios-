const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
  paymentId: { type: String, required: true, unique: true },
  amountPaid: { type: Number, required: true },
  paymentDate: { type: Date, required: true },
  paymentMethod: { type: String, required: true },
  balance: { type: Number, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  feeId: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeStructure', required: true }
}, { timestamps: true });
module.exports = mongoose.model('Payment', paymentSchema);
