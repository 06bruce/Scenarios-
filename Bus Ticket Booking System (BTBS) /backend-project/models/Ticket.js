const mongoose = require('mongoose');
const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  seatNumber: { type: String, required: true },
  travelDate: { type: Date, required: true },
  ticketPrice: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
  passengerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Passenger', required: true },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true }
}, { timestamps: true });
module.exports = mongoose.model('Ticket', ticketSchema);
