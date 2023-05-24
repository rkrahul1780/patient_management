var express = require('express');
var router = express.Router();
const { listProfile, Profile ,editProfile} = require('./controller');

router.get('/', listProfile);

router.post('/', Profile);
router.patch('/edit', editProfile);

module.exports = router;
