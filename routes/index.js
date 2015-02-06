var express = require('express');
var router = express.Router();

var index = require('../controllers/index');
var whois = require('../controllers/whois');

router.get('/', index.index);
router.get('/test/:q', index.test);
router.get('/whois/:q', whois.index);

module.exports = router;
