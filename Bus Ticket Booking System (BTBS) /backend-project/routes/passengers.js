const express = require('express');
const router = express.Router();
const Passenger = require('../models/Passenger');

router.get('/', async (req, res) => {
  try {
    const passengers = await Passenger.find();
    res.json(passengers);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', async (req, res) => {
  const passenger = new Passenger(req.body);
  try {
    const newPassenger = await passenger.save();
    res.status(201).json(newPassenger);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;
