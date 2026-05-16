const mongoose = require('mongoose');
const menuItemSchema = new mongoose.Schema({
  menuId: { type: String, required: true, unique: true },
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  availability: { type: String, required: true } // e.g., 'Available', 'Out of Stock'
}, { timestamps: true });
module.exports = mongoose.model('MenuItem', menuItemSchema);
