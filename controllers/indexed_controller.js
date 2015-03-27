var parseDomain = require('parse-domain');

exports.index = function (req, res) {

    var q = req.params.q || req.query.q || '';
    var data = {
        active: 'indexed',
        layout: 'layouts/default',
        title: '网站收录_收录查询_网站收录查询_百度收录查询'
    };

    if (q) {

        var parsed = parseDomain(q);

        if (parsed) {
            data.q = parsed.domain + '.' + parsed.tld;
            res.cookie('q', data.q);
            res.render('indexed', data);
        } else {
            data.body = '请输入正确的网址';
            res.render('indexed', data);
        }
    } else {
        data.body = '请输入要查询的网址';
        res.render('indexed', data);
    }
};