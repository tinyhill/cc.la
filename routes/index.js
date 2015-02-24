var express = require('express');
var router = express.Router();

var HomeController = require('../controllers/HomeController');

var AlexaController = require('../controllers/AlexaController');
var IndexedController = require('../controllers/IndexedController');
var IpController = require('../controllers/IpController');
var PrController = require('../controllers/PrController');
var WhoisController = require('../controllers/WhoisController');

router.get('/', HomeController.index);
router.get('/alexa', AlexaController.index);
router.get('/alexa/:q', AlexaController.index);
router.get('/indexed', IndexedController.index);
router.get('/indexed/:q', IndexedController.index);
router.get('/ip', IpController.index);
router.get('/ip/:q', IpController.index);
router.get('/pr', PrController.index);
router.get('/pr/:q', PrController.index);
router.get('/whois', WhoisController.index);
router.get('/whois/:q', WhoisController.index);

module.exports = router;
