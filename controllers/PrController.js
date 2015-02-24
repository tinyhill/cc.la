var parseDomain = require('parse-domain');

exports.index = function (req, res) {

    var q = req.params.q || req.query.q || '';
    var data = {
        active: 'pr',
        layout: 'layouts/default',
        title: 'PR值_PR查询_PR真假查询_PR劫持检测'
    };

    if (q) {

        var parsed = parseDomain(q);

        if (parsed) {
            data.q = parsed.domain + '.' + parsed.tld;
            res.cookie['q'] = data.q;
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