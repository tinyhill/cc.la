var express = require('express');
var router = express.Router();

var ip = require('../controllers/api/ip');
var pr = require('../controllers/api/pr');
var whois = require('../controllers/api/whois');

router.get('/ip/client', ip.client);
router.get('/ip/:q', ip.index);
router.get('/pr/:q', pr.index);
router.get('/whois/:q', whois.index);
router.get('/whois/refresh/:q', whois.refresh);

module.exports = router;
