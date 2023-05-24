var express = require('express');
var router = express.Router();
const {
  listVaccine,
  getVaccine,
  addVaccine,
  getVaccinebyID,
  getVaccinePatientsDataById,
  vaccinationCertificate,
  getALLVaccine,
} = require('./controller');

router.get('/vaccine', listVaccine);
router.get('/vaccine/:id', listVaccine);
router.get('/', getVaccine);
router.get('/list', getALLVaccine);
router.get('/:id', getVaccinebyID);
router.post('/add', addVaccine);
router.get('/list/:id', getVaccinePatientsDataById);
router.post('/certificate', vaccinationCertificate);

module.exports = router;
