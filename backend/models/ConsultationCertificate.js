const mongoose = require('mongoose');

const ConsultationCertificate = new mongoose.Schema({
  certificateNumber: {
    type: String,
    trim: true,
    required: true,
  },
  patientName: { type: String, trim: true, required: true },
  patientUUID: { type: String, trim: true, required: true },
  patientRegId: { type: String, trim: true, required: true },
  doctorName: { type: String, trim: true, required: true },
  consultationTime: { type: String, trim: true, required: true },
  departmentName: { type: String, trim: true, required: true },
  hospitalName: { type: String, trim: true, required: true },
  issuerName: { type: String, trim: true, required: true },
  issuerId: { type: String, trim: true, required: true },
  issuedDateTime: { type: String, trim: true, required: true },
});

module.exports = mongoose.model(
  'consultationCertificate',
  ConsultationCertificate
);
