var dns = require('dns');
var isIp = require('is-ip');
var parseDomain = require('parse-domain');
var qqwry = require('lib-qqwry').info();

function getQQWry(ip) {
    var data = qqwry.searchIP(ip);
    data.Area = data.Area.replace(/\s*CZ88\.NET/g, '');
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
            dns.lookup(q, function (err, data) {
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