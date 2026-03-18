const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  dentist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dentist',
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Booked', 'Completed', 'Cancelled'],
    default: 'Booked'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('appointment', AppointmentSchema);