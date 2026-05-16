const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
  customerId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  telephone: { type: String, required: true },
  tableNumber: { type: String, required: true },
  gender: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Customer', customerSchema);
