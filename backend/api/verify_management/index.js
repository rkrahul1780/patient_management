var express = require('express');
var router = express.Router();
const { verifyconsultation} = require('./controller');



router.post('/consultation', verifyconsultation);
// router.patch('/edit', editProfile);

module.exports = router;
