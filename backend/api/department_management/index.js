var express = require('express');
var router = express.Router();
const { listDepartment, getById } = require('./controller');

router.get('/', listDepartment);
router.get('/:id', listDepartment);

module.exports = router;
