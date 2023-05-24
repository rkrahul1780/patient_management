const mongoose = require('mongoose');

const hospital = new mongoose.Schema({
  hospitalName: { type: String, lowercase: true, trim: true, required: true },
  place: { type: String, trim: true, required: true },
  hospitalId: { type: Number, trim: true, required: true },
});

module.exports = mongoose.model('hospital', hospital);
