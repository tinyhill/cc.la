exports.index = function (req, res) {
    res.render('index', {
        data: [
            {"name": "网站信息查询", "desc": "最好用的网站信息查询工具"},
            {"name": "网站信息查询", "desc": "最好用的网站信息查询工具"},
            {"name": "网站信息查询", "desc": "最好用的网站信息查询工具"},
            {"name": "网站信息查询", "desc": "最好用的网站信息查询工具"},
            {"name": "网站信息查询", "desc": "最好用的网站信息查询工具"},
            {"name": "网站信息查询", "desc": "最好用的网站信息查询工具"},
            {"name": "网站信息查询", "desc": "最好用的网站信息查询工具"},
            {"name": "网站信息查询", "desc": "最好用的网站信息查询工具"},
            {"name": "网站信息查询", "desc": "最好用的网站信息查询工具"}
        ]
    });
};

exports.test = function (req, res) {
    var parseDomain = require('parse-domain');
    var ret = parseDomain('afdsdf%@#$sadfadddd.cnx');
    console.log(ret);
    res.send(ret);
};