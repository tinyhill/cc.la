var express = require('express');
var router = express.Router();

var ip = require('../controllers/ip');
var pr = require('../controllers/pr');
var whois = require('../controllers/whois');

router.get('/ip/:host', ip.index);
router.get('/pr/:host', pr.index);
router.get('/whois/:host', whois.index);

module.exports = router;
