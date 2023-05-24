var express = require('express');
var router = express.Router();

var contactRouter = require('../api/contact_management/index');
var adminRouter = require('../api/admin_management/index');
var departmentRouter = require('../api/department_management/index');
var doctorRouter = require('../api/doctor_management/index');
var hospitalRouter = require('../api/hospital_management/index');
var vaccineRouter = require('../api/vaccine_management/index');
var profileRouter = require('../api/profile_management/index');
var consultationRouter = require('../api/consultation_management/index');
var verifyRouter = require('../api/verify_management/index');
var transactionRouter = require('../api/transaction_management/index');

router.use('/contact', contactRouter);
router.use('/', adminRouter);
router.use('/profile', profileRouter);
router.use('/department', departmentRouter);
router.use('/doctor', doctorRouter);
router.use('/hospital', hospitalRouter);
router.use('/vaccination', vaccineRouter);
router.use('/consultation', consultationRouter);
router.use('/verify', verifyRouter);
router.use('/transaction', transactionRouter);

module.exports = router;
