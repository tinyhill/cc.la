var parseDomain = require('parse-domain');
var qUtil = require('../utils/q_util');
var _ = require('lodash');

exports.index = function (req, res) {

    var q = _.trim(req.params.q || req.query.q || '');
    var data = {
        active: 'pr',
        layout: 'layouts/default',
        queries: qUtil.read(),
        title: 'PR值_PR查询_PR真假查询_PR劫持检测'
    };

    if (q) {

        var parsed = parseDomain(q);

        if (parsed) {
            data.q = parsed.domain + '.' + parsed.tld;
            data.q = parsed.subdomain ? parsed.subdomain + '.' + data.q : data.q;
            qUtil.write(res, data.q);
            res.render('pr', data);
        } else {
            data.body = '请输入正确的网址';
            res.render('pr', data);
        }
    } else {
        data.body = '请输入要查询的网址';
        res.render('pr', data);
    }
};