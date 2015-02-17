var express = require('express');
var router = express.Router();

var IndexController = require('../controllers/IndexController');
var PrController = require('../controllers/PrController');
var SiteController = require('../controllers/SiteController');
var WhoisController = require('../controllers/WhoisController');

router.get('/', IndexController.index);
router.get('/pr', PrController.index);
router.get('/pr/:q', PrController.index);
router.get('/site', SiteController.index);
router.get('/site/:q', SiteController.index);
router.get('/whois', WhoisController.index);
router.get('/whois/:q', WhoisController.index);

module.exports = router;
