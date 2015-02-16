var dns = require('dns');
var ip = require('ip');
var isIp = require('is-ip');
var parseDomain = require('parse-domain');
var qqwry = require('lib-qqwry').info();

function getQQWry(ip) {

    var data = qqwry.searchIP(ip);
    var regex = /(\s*CZ88\.NET|对方和您在同一内部网)/g;

    data.Area = data.Area.replace(regex, '');
    return data;
}

exports.index = function (req, res) {

    var q = req.params.q;

    if (isIp(q)) {
        res.json({
            status: 'success',
            data: getQQWry(q)
        });
    } else {
        q = parseDomain(q);
        if (q) {
            q = q.domain + '.' + q.tld;
            dns.lookup(q, 4, function (err, data) {
                if (err) {
                    res.json({
                        status: 'fail',
                        data: err
                    });
                } else {
                    res.json({
                        status: 'success',
                        data: getQQWry(data)
                    });
                }
            });
        } else {
            res.json({
                status: 'error',
                message: q
            });
        }
    }
};

exports.client = function (req, res) {

    var addr = ip.address();

    res.json({
        status: 'success',
        data: getQQWry(addr)
    });
};