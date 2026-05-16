const express = require('express');
const Farmer = require('../models/Farmer');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const farmer = new Farmer(req.body);
    await farmer.save();
    res.status(201).json(farmer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
