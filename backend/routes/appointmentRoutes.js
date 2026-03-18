const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

// @desc    Get all appointments
// @route   GET /api/appointments
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('dentist', 'name clinicName');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Create an appointment
// @route   POST /api/appointments
router.post('/', async (req, res) => {
  const { appointmentDate } = req.body;

  // Server-side validation
  if (new Date(appointmentDate) < new Date()) {
    return res.status(400).json({ message: 'Appointment date must be in the future' });
  }

  const appointment = new Appointment({
    dentist: req.body.dentist,
    patientName: req.body.patientName,
    age: req.body.age,
    gender: req.body.gender,
    appointmentDate: req.body.appointmentDate,
  });

  try {
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @desc    Update appointment status
// @route   PATCH /api/appointments/:id/status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = req.body.status;
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
