const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const signup = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
  aadharNo: {
    type: Number,
    required: false,
    trim: true,
  },
  dob: {
    type: Date,
    required: false,
    trim: true,
  },
  pinCode: {
    type: Number,
    required: false,
    trim: true,
  },
  country: {
    type: String,
    required: false,
    trim: true,
  },
  state: {
    type: String,
    required: false,
    trim: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Patient'],
  },
  loginId: {
    type: ObjectId,
    ref: 'login',
    required: false,
    trim: true,
  },
});

module.exports = mongoose.model('signup', signup);
