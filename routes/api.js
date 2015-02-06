var express = require('express');
var router = express.Router();

var ip = require('../controllers/ip/api');
var pr = require('../controllers/pr/api');
var whois = require('../controllers/whois/api');

router.get('/ip/:q', ip.index);
router.get('/pr/:q', pr.index);
router.get('/whois/:q', whois.index);

module.exports = router;
