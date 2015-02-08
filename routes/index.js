var express = require('express');
var router = express.Router();

var index = require('../controllers/index');
var site = require('../controllers/site');
var whois = require('../controllers/whois');

router.get('/', index.index);
router.get('/test/:q', index.test);
router.get('/site', site.index);
router.get('/site/:q', site.index);
router.get('/whois', whois.index);
router.get('/whois/:q', whois.index);

module.exports = router;
