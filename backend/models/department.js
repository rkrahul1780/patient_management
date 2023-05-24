const mongoose = require('mongoose');

const department = new mongoose.Schema({
  departmentName: { type: String, lowercase: true, trim: true, required: true },
  departmentId: { type: String, trim: true, required: true },
});

module.exports = mongoose.model('department', department);
