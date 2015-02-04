var dns = require('dns');
var isIp = require('is-ip');
var parse = require('domain-name-parser');
var qqwry = require('lib-qqwry').info();

function getIPInfo(ip) {
    var data = qqwry.searchIP(ip);
    data.Area = data.Area.replace('CZ88.NET', '');
    return data;
}

exports.index = function (req, res) {

    var host = req.params.host;
    var result = {};

    if (isIp(host)) {
        result.status = 'success';
        result.data = getIPInfo(host);
        res.json(result);
    } else {
        host = parse(host).domainName;
        dns.lookup(host, function (err, ip) {
            if (err) {
                result.status = 'fail';
                result.data = err;
            } else {
                result.status = 'success';
                result.data = getIPInfo(ip);
            }
            res.json(result);
        });
    }
};