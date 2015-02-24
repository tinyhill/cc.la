var cache = require('express-redis-cache')();
var moment = require('moment');
var parseDomain = require('parse-domain');

exports.index = function (req, res) {

    var q = req.params.q || req.query.q || '';
    var data = {
        active: 'whois',
        layout: 'layouts/default',
        title: 'WHOIS查询_域名WHOIS查询_域名注册信息查询'
    };

    if (q) {

        var parsed = parseDomain(q);

        if (parsed) {
            data.q = parsed.domain + '.' + parsed.tld;
            res.cookie['q'] = data.q;
            cache.get('api/whois/' + data.q, function (err, entries) {
                if (err) {
                    data.body = '服务器错误，请稍候重试';
                    res.render('whois', data);
                } else {

                    var touched = entries[0] ? entries[0].touched : null;

                    touched = parseInt(touched, 10) || new Date();
                    data.touched = moment(touched).format('YYYY年MM月DD日HH时mm分ss秒');
                    res.render('whois', data);
                }
            });
        } else {
            data.body = '请输入正确的网址';
            res.render('whois', data);
        }
    } else {
        data.body = '请输入要查询的网址';
        res.render('whois', data);
    }
};