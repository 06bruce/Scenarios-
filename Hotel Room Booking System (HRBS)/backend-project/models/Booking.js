const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
  guestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest', required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true }
}, { timestamps: true });
module.exports = mongoose.model('Booking', bookingSchema);
