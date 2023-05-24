var express = require('express');
var router = express.Router();
const { listDoctor } = require('./controller');

router.get('/', listDoctor);

module.exports = router;
