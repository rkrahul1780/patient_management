const mongoose = require('mongoose');

const doctor = new mongoose.Schema({
  doctorName: { type: String, lowercase: true, trim: true, required: true },
  departmentId: { type: String, trim: true, required: true },
  hospitalId: { type: String, trim: true, required: true },
});

module.exports = mongoose.model('doctor', doctor);
