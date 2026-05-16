const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  description: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  reorderLevel: { type: Number, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Product', productSchema);
