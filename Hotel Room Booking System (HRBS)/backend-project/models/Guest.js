const mongoose = require('mongoose');
const guestSchema = new mongoose.Schema({
  guestId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  nationality: { type: String, required: true },
  telephone: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Guest', guestSchema);
