var express = require('express');
var router = express.Router();
const controller = require('./controller');

router.post('/add', controller.addconsultation);
router.get('/', controller.getconsultation);
router.get('/list', controller.getallconsultation);
router.get('/list/:id', controller.getPatientsDataById);
router.get('/:id', controller.getconsultationbyID);
router.post('/certificate', controller.consultationCertificate);

module.exports = router;
