const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const vaccination = new mongoose.Schema({
  vaccineId: { type: ObjectId, ref: 'vaccine', trim: true, required: true },
  hospitalId: { type: ObjectId, ref: 'hospital', trim: true, required: true },
  loginId: { type: ObjectId, ref: 'login', trim: true, required: true },
  diseaseId: { type: ObjectId, ref: 'diseases', trim: true, required: true },
  transactionHash: {
    type: String,
    required: false,
    trim: true,
  },
  time: {
    type: String,
    required: false,
    trim: true,
  },
  date: { type: Date, trim: true, required: true },
  Status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
});

module.exports = mongoose.model('vaccination', vaccination);
