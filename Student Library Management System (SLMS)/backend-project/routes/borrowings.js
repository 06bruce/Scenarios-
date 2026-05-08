const express = require('express');
const router = express.Router();
const Borrowing = require('../models/Borrowing');

// GET all borrowings (with joined data)
router.get('/', async (req, res) => {
  try {
    const borrowings = await Borrowing.find()
      .populate('studentId')
      .populate('bookId');
    res.json(borrowings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new borrowing
router.post('/', async (req, res) => {
  const borrowing = new Borrowing(req.body);
  try {
    const newBorrowing = await borrowing.save();
    res.status(201).json(newBorrowing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a borrowing by id
router.put('/:id', async (req, res) => {
  try {
    const updatedBorrowing = await Borrowing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBorrowing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a borrowing by id
router.delete('/:id', async (req, res) => {
  try {
    await Borrowing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Borrowing deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
