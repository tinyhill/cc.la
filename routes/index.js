var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      data: [
          {
              "name": "网站信息查询",
              "desc": "最好用的网站信息查询工具"
          },
          {
              "name": "网站信息查询",
              "desc": "最好用的网站信息查询工具"
          },
          {
              "name": "网站信息查询",
              "desc": "最好用的网站信息查询工具"
          },
          {
              "name": "网站信息查询",
              "desc": "最好用的网站信息查询工具"
          },
          {
              "name": "网站信息查询",
              "desc": "最好用的网站信息查询工具"
          },
          {
              "name": "网站信息查询",
              "desc": "最好用的网站信息查询工具"
          },
          {
              "name": "网站信息查询",
              "desc": "最好用的网站信息查询工具"
          },
          {
              "name": "网站信息查询",
              "desc": "最好用的网站信息查询工具"
          }
      ]
  });
});

module.exports = router;
