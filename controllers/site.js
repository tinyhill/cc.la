var parseDomain = require('parse-domain');

exports.index = function (req, res) {

    var q = req.params.q || req.query.q || '';
    var data = {
        action: 'site',
        layout: 'layouts/result'
    };

    if (q) {
        q = parseDomain(q);
        if (q) {
            data.q = q.domain + '.' + q.tld;
        } else {
            data.result = '请输入正确的网址';
        }
    } else {
        data.result = '请输入要查询的网址';
    }

    res.render('whois', data);
};