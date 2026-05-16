const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  orderDate: { type: Date, required: true },
  orderTime: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true }
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);
