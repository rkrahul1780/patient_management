const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const consultation = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  hospitalId: {
    type: ObjectId,
    ref: 'hospital',
    required: true,
    trim: true,
  },
  departmentId: {
    type: ObjectId,
    ref: 'department',
    required: false,
    trim: true,
  },
  doctorId: {
    type: ObjectId,
    ref: 'doctor',
    required: false,
    trim: true,
  },
  time: {
    type: String,
    required: false,
    trim: true,
  },
  payment: {
    type: String,
    required: false,
    trim: true,
  },
  Status: {
    type: String,
    enum: ['Available', 'Leave', 'Occupied'],
    default: 'Available',
    required: false,
    trim: true,
  },
  loginId: {
    type: ObjectId,
    ref: 'login',
    required: false,
    trim: true,
  },
});

module.exports = mongoose.model('consultation', consultation);
