const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const transaction = new mongoose.Schema({
  amount: { type: String, trim: true, required: false },
  status: { type: String, trim: true, required: false },
  appointmentType: {
    type: String,
    enum: ['consultation', 'vaccination'],
    required: false,
  },
  loginId: { type: ObjectId, ref: 'login', required: false },
  dataId: { type: String, trim: true, required: false },
});

module.exports = mongoose.model('transaction', transaction);
