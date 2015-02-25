var qqwry = require('lib-qqwry').info();
var uaParser = require('ua-parser');

function getQQWry(ip) {

    var data = qqwry.searchIP(ip);
    var regex = /(\s*CZ88\.NET|对方和您在同一内部网)/g;

    data.Area = data.Area.replace(regex, '');
    return data;
}

exports.index = function (req, res) {

    var addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var r = uaParser.parse(req.headers['user-agent']);

    res.render('home', {
        active: 'home',
        ip: getQQWry(addr),
        os: r.os.toString(),
        q: req.cookies.q,
        ua: r.ua.toString()
    });
};