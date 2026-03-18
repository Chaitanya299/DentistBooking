const express = require('express');
const router = express.Router();
const Dentist = require('../models/Dentist');

// @desc    Get all dentists with search, filter, and pagination
// @route   GET /api/dentists
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  const { search, location, minExperience } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { clinicName: { $regex: search, $options: 'i' } }
    ];
  }

  if (location) {
    query.location = location;
  }

  if (minExperience) {
    query.yearsOfExperience = { $gte: parseInt(minExperience) };
  }

  try {
    const total = await Dentist.countDocuments(query);
    const dentists = await Dentist.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      dentists,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Add a dentist
// @route   POST /api/dentists
router.post('/', async (req, res) => {
  const dentist = new Dentist({
    name: req.body.name,
    qualification: req.body.qualification,
    yearsOfExperience: req.body.yearsOfExperience,
    clinicName: req.body.clinicName,
    address: req.body.address,
    location: req.body.location,
    photo: req.body.photo
  });

  try {
    const newDentist = await dentist.save();
    res.status(201).json(newDentist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
