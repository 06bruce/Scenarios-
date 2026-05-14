const mongoose = require('mongoose');
const rentalSchema = new mongoose.Schema({
  rentalId: { type: String, required: true, unique: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalCost: { type: Number, required: true },
  depositPaid: { type: Number, required: true },
  status: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true }
}, { timestamps: true });
module.exports = mongoose.model('Rental', rentalSchema);
