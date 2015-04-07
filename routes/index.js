var express = require('express');
var router = express.Router();

var homeController = require('../controllers/home_controller');
var aboutController = require('../controllers/about_controller');

var alexaController = require('../controllers/alexa_controller');
var indexedController = require('../controllers/indexed_controller');
var ipController = require('../controllers/ip_controller');
var linkController = require('../controllers/link_controller');
var prController = require('../controllers/pr_controller');
var whoisController = require('../controllers/whois_controller');

router.get('/', homeController.index);
router.get('/about', aboutController.index);
router.get('/contact', aboutController.contact);
router.get('/help', aboutController.help);
router.get('/links', aboutController.links);
router.get('/sitemap', aboutController.sitemap);
router.get('/sitemap', aboutController.sitemap);
router.get('/sitemap/:id', aboutController.sitemap);

router.get('/alexa', alexaController.index);
router.get('/alexa/:q', alexaController.index);
router.get('/indexed', indexedController.index);
router.get('/indexed/:q', indexedController.index);
router.get('/ip', ipController.index);
router.get('/ip/:q', ipController.index);
router.get('/link', linkController.index);
router.get('/link/:q', linkController.index);
router.get('/pr', prController.index);
router.get('/pr/:q', prController.index);
router.get('/whois', whoisController.index);
router.get('/whois/:q', whoisController.index);

module.exports = router;
