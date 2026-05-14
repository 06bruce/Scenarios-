const express = require('express');
const router = express.Router();
const Route = require('../models/Route');

router.get('/', async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', async (req, res) => {
  const route = new Route(req.body);
  try {
    const newRoute = await route.save();
    res.status(201).json(newRoute);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;
