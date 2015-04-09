var parseDomain = require('parse-domain');

exports.index = function (req, res) {

    var q = req.params.q || req.query.q || '';
    var data = {
        active: 'alexa',
        layout: 'layouts/default',
        title: 'ALEXA排名_网站排名_网站排名查询'
    };

    if (q) {

        var parsed = parseDomain(q);

        if (parsed) {
            data.q = parsed.domain + '.' + parsed.tld;
            data.q = parsed.subdomain ? parsed.subdomain + '.' + data.q : data.q;
            res.cookie('q', data.q);
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