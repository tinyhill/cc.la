var express = require('express');
var router = express.Router();
var cache = require('express-redis-cache')();

var AlexaController = require('../controllers/api/AlexaController');
var IndexedController = require('../controllers/api/IndexedController');
var IpController = require('../controllers/api/IpController');
var LinkController = require('../controllers/api/LinkController');
var PrController = require('../controllers/api/PrController');
var WhoisController = require('../controllers/api/WhoisController');

router.get('/alexa/:q', AlexaController.index);
router.get('/indexed/:q/:engine/:cmd', IndexedController.index);
router.get('/indexed/:q/:engine/:cmd/:period', IndexedController.index);
router.get('/ip/client', IpController.client);
router.get('/ip/:q', IpController.index);
router.get('/link/:q', LinkController.index);
router.get('/link/backlink/:q/:link', LinkController.backlink);
router.get('/link/backlink/:q/:link/:spider', LinkController.backlink);
router.get('/pr/:q', PrController.index);
router.get('/whois/:q', WhoisController.index);
router.get('/whois/refresh/:q', WhoisController.refresh);

module.exports = router;
