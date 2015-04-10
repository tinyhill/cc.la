var express = require('express');
var router = express.Router();
var cache = require('express-redis-cache')();

var apiMiddleware = require('../middlewares/api_middleware');

var alexaController = require('../controllers/api/alexa_controller');
var indexedController = require('../controllers/api/indexed_controller');
var ipController = require('../controllers/api/ip_controller');
var linkController = require('../controllers/api/link_controller');
var prController = require('../controllers/api/pr_controller');
var whoisController = require('../controllers/api/whois_controller');

router.all('/*', apiMiddleware.index);

router.get('/alexa/:q', alexaController.index);
router.get('/indexed/:q/:engine/:cmd', indexedController.index);
router.get('/indexed/:q/:engine/:cmd/:period', indexedController.index);
router.get('/ip/client', ipController.client);
router.get('/ip/:q', ipController.index);
router.get('/link/:q', linkController.index);
router.get('/link/backlink/:q/:link', linkController.backlink);
router.get('/link/backlink/:q/:link/:spider', linkController.backlink);
router.get('/pr/:q', prController.index);
router.get('/whois/:q', whoisController.index);
router.get('/whois/refresh/:q', whoisController.refresh);

module.exports = router;
