const express = require('express');
const Distribution = require('../models/Distribution');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const distributions = await Distribution.find().populate('farmer').populate('supply');
    res.json(distributions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const distribution = new Distribution(req.body);
    await distribution.save();
    await distribution.populate('farmer').populate('supply');
    res.status(201).json(distribution);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const distribution = await Distribution.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('farmer').populate('supply');
    res.json(distribution);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Distribution.findByIdAndDelete(req.params.id);
    res.json({ message: 'Distribution deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
