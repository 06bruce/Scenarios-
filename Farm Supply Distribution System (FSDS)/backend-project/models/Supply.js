const mongoose = require('mongoose');
const supplySchema = new mongoose.Schema({
  supplyId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  quantityInStock: { type: Number, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Supply', supplySchema);
