var express = require('express');
var router = express.Router();

var index = require('../controllers/index');
var site = require('../controllers/site');
var WhoisController = require('../controllers/WhoisController');

router.get('/', index.index);
router.get('/test/:q', index.test);
router.get('/site', site.index);
router.get('/site/:q', site.index);
router.get('/whois', WhoisController.index);
router.get('/whois/:q', WhoisController.index);

module.exports = router;
