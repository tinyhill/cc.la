var parseDomain = require('parse-domain');
var qUtil = require('../utils/q_util');
var _ = require('lodash');

exports.index = function (req, res) {

    var q = _.trim(req.params.q || req.query.q || '');
    var data = {
        active: 'alexa',
        layout: 'layouts/default',
        queries: qUtil.read(),
        title: 'ALEXA排名_网站排名_网站排名查询'
    };

    if (q) {

        var parsed = parseDomain(q);

        if (parsed) {
            data.q = parsed.domain + '.' + parsed.tld;
            data.q = parsed.subdomain ? parsed.subdomain + '.' + data.q : data.q;
            qUtil.write(res, data.q);
            res.render('alexa', data);
        } else {
            data.body = '请输入正确的网址';
            res.render('alexa', data);
        }
    } else {
        data.body = '请输入要查询的网址';
        res.render('alexa', data);
    }
};