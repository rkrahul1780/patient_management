const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const medicaldetails = new mongoose.Schema({
  blood: {
    type: String,
    required: true,
    trim: true,
  },
  height: {
    type: String,
    required: true,
    trim: true,
  },
  weight: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  loginId: {
    type: ObjectId,
    ref: 'login',
    required: false,
    trim: true,
  },
});

module.exports = mongoose.model('medicaldetails', medicaldetails);
