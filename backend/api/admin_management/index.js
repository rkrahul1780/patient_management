var express = require('express');
var router = express.Router();
const controller = require('./controller');

router.post('/auth/login', controller.login);
router.post('/signup', controller.signup);
router.patch('/changepassword', controller.reset);

module.exports = router;
