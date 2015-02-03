var express = require('express');
var router = express.Router();

var pr = require('../controllers/pr');

router.get('/pr/:host', pr.index);

module.exports = router;
