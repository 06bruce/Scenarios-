const express = require('express');
const router = express.Router();
const StockMovement = require('../models/StockMovement');

router.get('/', async (req, res) => {
  try {
    const movements = await StockMovement.find().populate('productId').populate('categoryId');
    res.json(movements);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', async (req, res) => {
  const movement = new StockMovement(req.body);
  try {
    const newMovement = await movement.save();
    res.status(201).json(newMovement);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await StockMovement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await StockMovement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Stock movement deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
