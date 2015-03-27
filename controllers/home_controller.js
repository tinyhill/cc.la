var parseDomain = require('parse-domain');
var path = require('path');
var qqwry = require('lib-qqwry').info(path.join(__dirname, '../data/qqwry/qqwry.dat'));
var uaParser = require('ua-parser');

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress.replace(/^::ffff:/, '');
}

function getQQWry(ip) {

    var data = qqwry.searchIP(ip);
    var regex = /(\s*CZ88\.NET|对方和您在同一内部网)/g;

    data.Area = data.Area.replace(regex, '');
    return data;
}

exports.index = function (req, res) {

    var ip = getClientIp(req);
    var q = req.params.q || req.query.q || req.cookies.q || '';
    var r = uaParser.parse(req.headers['user-agent']);

    if (q && parseDomain(q)) {
        res.cookie('q', q);
    }

    res.render('home', {
        active: 'home',
        q: q,
        qqwry: getQQWry(ip),
        os: r.os.toString(),
        ua: r.ua.toString()
    });
};