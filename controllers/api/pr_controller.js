var cache = require('express-redis-cache')();
var PageRank = require('pagerank-hk');
var parseDomain = require('parse-domain');

var model = require('../../models/pr_model');
var proxyServer = require('../../config/proxy_server');

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
    var parsed = parseDomain(q);

    if (parsed) {
        q = parsed.domain + '.' + parsed.tld;
        q = parsed.subdomain ? parsed.subdomain + '.' + q : q;

        var key = 'api/pr/' + q;

        cache.get(key, function (err, entries) {
            if (err) {
                fail(res, err);
            } else {

                var body = entries[0] ? entries[0].body : null;

                if (body) {
                    success(res, body);
                } else {

                    var server = proxyServer['us-fremont-76'].split(':');

                    PageRank.get(q, {
                        host: server[0],
                        port: server[1]
                    }, function (err, data) {console.log(err);
                        if (err || data === null) {
                            fail(res, err);
                        } else {
                            success(res, data);
                            cache.add(key, data, {
                                expire: 3600 * 24 * 30
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
};