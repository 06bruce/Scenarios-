const mongoose = require('mongoose');

const borrowingSchema = new mongoose.Schema({
  borrowId: { type: String, required: true, unique: true },
  borrowDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  status: { type: String, required: true }, // e.g., 'Borrowed', 'Returned'
  fine: { type: Number, default: 0 },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Borrowing', borrowingSchema);
