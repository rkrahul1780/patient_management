const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const disease = new mongoose.Schema({
  diseaseName: {
    type: String,
    required: false,
    trim: true,
  },
  startedDate: {
    type: Date,
    required: false,
    trim: true,
  },
  remarks: {
    type: String,
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

module.exports = mongoose.model('disease', disease);
