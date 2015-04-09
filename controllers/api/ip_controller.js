var cache = require('express-redis-cache')();
var dns = require('dns');
var ip = require('ip');
var isIp = require('is-ip');
var parseDomain = require('parse-domain');
var path = require('path');
var qqwry = require('lib-qqwry').info(path.join(__dirname, '../../data/qqwry/qqwry.dat'));


var model = require('../../models/ip_model');

function getQQWry(ip) {

    var data = qqwry.searchIP(ip);
    var regex = /(\s*CZ88\.NET|对方和您在同一内部网)/g;

    data.Area = data.Area.replace(regex, '');
    return data;
}

function success(res, data) {
    res.send({
        status: 'success',
        data: data
    });
}

function fail(res, err) {
    res.send({
        status: 'fail',
        data: err
    });
}

function error(res) {
    res.send({
        status: 'error',
        message: '参数错误'
    });
}

exports.index = function (req, res) {

    var q = req.params.q;

    if (isIp(q)) {
        success(res, getQQWry(q));
    } else {

        var parsed = parseDomain(req.params.q);

        if (parsed) {
            q = parsed.domain + '.' + parsed.tld;
            q = parsed.subdomain ? parsed.subdomain + '.' + q : q;

            var key = 'api/ip/' + q;

            cache.get(key, function (err, entries) {
                if (err) {
                    fail(res, err);
                } else {

                    var body = entries[0] ? entries[0].body : null;

                    if (body) {
                        success(res, getQQWry(body));
                    } else {
                        dns.lookup(q, 4, function (err, data) {
                            if (err) {
                                fail(res, err);
                            } else {
                                success(res, getQQWry(data));
                                cache.add(key, data, {
                                    expire: 3600 * 24
                                }, function () {
                                    model.create({
                                        body: data,
                                        key: key,
                                        q: q
                                    });
                                });
                            }
                        });
                    }

                }
            });
        } else {
            error(res);
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