var express = require('express');
var router = express.Router();
var cache = require('express-redis-cache')();

var IpController = require('../controllers/api/IpController');
var PrController = require('../controllers/api/PrController');
var WhoisController = require('../controllers/api/WhoisController');

router.get('/ip/client', IpController.client);
router.get('/ip/:q', IpController.index);
router.get('/pr/:q', PrController.index);
router.get('/pr/refresh/:q', PrController.refresh);
router.get('/whois/:q', WhoisController.index);
router.get('/whois/refresh/:q', WhoisController.refresh);

module.exports = router;
