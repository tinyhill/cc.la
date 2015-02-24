var ip = require('ip');
var qqwry = require('lib-qqwry').info();
var uaParser = require('ua-parser');

function getQQWry(ip) {

    var data = qqwry.searchIP(ip);
    var regex = /(\s*CZ88\.NET|对方和您在同一内部网)/g;

    data.Area = data.Area.replace(regex, '');
    return data;
}

exports.index = function (req, res) {

    var addr = ip.address();
    var ua = req.headers['user-agent'];
    var r = uaParser.parse(ua);

    res.render('home', {
        active: 'home',
        ip: getQQWry(addr),
        os: r.os.toString(),
        q: res.cookie['q'],
        ua: r.ua.toString()
    });
};