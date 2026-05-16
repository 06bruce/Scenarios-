const mongoose = require('mongoose');
const distributionSchema = new mongoose.Schema({
  distributionId: { type: String, required: true, unique: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
  supply: { type: mongoose.Schema.Types.ObjectId, ref: 'Supply', required: true },
  quantity: { type: Number, required: true },
  distributionDate: { type: Date, required: true },
  status: { type: String, required: true, default: 'Pending' }
}, { timestamps: true });
module.exports = mongoose.model('Distribution', distributionSchema);
