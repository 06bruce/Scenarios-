const mongoose = require('mongoose');
const clientSchema = new mongoose.Schema({
  clientId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  companyName: { type: String },
  telephone: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Client', clientSchema);
