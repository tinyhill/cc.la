var parseDomain = require('parse-domain');

exports.index = function (req, res) {

    var q = req.params.q || req.query.q || '';
    var data = {
        active: 'link',
        layout: 'layouts/default',
        title: '友链查询_友链检查_友链检测_友情链接查询_友情链接检查_友情链接检测'
    };

    if (q) {

        var parsed = parseDomain(q);

        if (parsed) {
            data.q = parsed.domain + '.' + parsed.tld;
            data.q = parsed.subdomain ? parsed.subdomain + '.' + data.q : data.q;
            res.cookie('q', data.q);
            res.render('link', data);
        } else {
            data.body = '请输入正确的网址';
            res.render('link', data);
        }
    } else {
        data.body = '请输入要查询的网址';
        res.render('link', data);
    }
};