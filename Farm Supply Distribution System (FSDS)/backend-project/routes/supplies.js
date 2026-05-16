const express = require('express');
const Supply = require('../models/Supply');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const supplies = await Supply.find();
    res.json(supplies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const supply = new Supply(req.body);
    await supply.save();
    res.status(201).json(supply);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
