var isIp = require('is-ip');
var parseDomain = require('parse-domain');
var qUtil = require('../utils/q_util');
var _ = require('lodash');

exports.index = function (req, res) {

    var q = _.trim(req.params.q || req.query.q || '');
    var data = {
        active: 'ip',
        layout: 'layouts/default',
        queries: qUtil.read(),
        title: 'IP地址_IP地址查询_IP查询'
    };

    if (q) {

        if (isIp(q)) {
            data.isip = true;
            data.q = q;
            res.render('ip', data);
        } else {

            var parsed = parseDomain(q);

            if (parsed) {
                data.q = parsed.domain + '.' + parsed.tld;
                data.q = parsed.subdomain ? parsed.subdomain + '.' + data.q : data.q;
                qUtil.write(res, data.q);
                res.render('ip', data);
            } else {
                data.body = '请输入正确的网址';
                res.render('ip', data);
            }
        }
    } else {
        data.body = '请输入要查询的网址';
        res.render('ip', data);
    }
};