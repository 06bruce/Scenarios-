const express = require('express');
const router = express.Router();
const Rental = require('../models/Rental');

router.get('/', async (req, res) => {
  try {
    const rentals = await Rental.find().populate('clientId').populate('equipmentId');
    res.json(rentals);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', async (req, res) => {
  const rental = new Rental(req.body);
  try {
    const newRental = await rental.save();
    res.status(201).json(newRental);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Rental.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await Rental.findByIdAndDelete(req.params.id);
    res.json({ message: 'Rental deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
