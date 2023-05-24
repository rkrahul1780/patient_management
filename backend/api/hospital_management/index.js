var express = require('express');
var router = express.Router();
const { listHospital } = require('./controller');

router.get('/', listHospital);
router.get('/:id', listHospital);

module.exports = router;
