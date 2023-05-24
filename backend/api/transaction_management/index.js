var express = require('express');
var router = express.Router();
const { getAllTransactions } = require('./controller');

router.get('/', getAllTransactions);

module.exports = router;
