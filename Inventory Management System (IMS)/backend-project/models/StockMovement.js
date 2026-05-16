const mongoose = require('mongoose');
const stockMovementSchema = new mongoose.Schema({
  movementId: { type: String, required: true, unique: true },
  movementType: { type: String, required: true }, // 'In' or 'Out'
  quantity: { type: Number, required: true },
  movementDate: { type: Date, required: true },
  remarks: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
}, { timestamps: true });
module.exports = mongoose.model('StockMovement', stockMovementSchema);
