const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');

router.get('/', async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json(guests);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', async (req, res) => {
  const guest = new Guest(req.body);
  try {
    const newGuest = await guest.save();
    res.status(201).json(newGuest);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;
