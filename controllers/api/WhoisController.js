var cache = require('express-redis-cache')();
var parseDomain = require('parse-domain');
var whois = require('node-whois');
var _ = require('lodash');

function success(res, data) {
    res.send({
        status: 'success',
        data: _.trim(data).replace(/(\n|\r\n)/g, '<br>')
    });
}

function fail(res, err) {
    res.send({
        status: 'fail',
        data: err
    });
}

exports.index = function (req, res) {

    var parsed = parseDomain(req.params.q);

    if (parsed) {

        var q = parsed.domain + '.' + parsed.tld;
        var key = 'api/whois/' + q;

        cache.get(key, function (err, entries) {
            if (err) {
                fail(res, err);
            } else {

                var body = entries[0] ? entries[0].body : null;

                if (body) {
                    success(res, body);
                } else {
                    whois.lookup(q, function (err, data) {
                        if (err) {
                            fail(res, err);
                        } else {
                            cache.add(key, data, {
                                expire: 3600 * 24 * 30
                            }, function () {
                                success(res, data);
                            });
                        }
                    });
                }
            }
        });
    } else {
        res.send({
            status: 'error',
            message: parsed
        });
    }
};

exports.refresh = function (req, res) {

    var parsed = parseDomain(req.params.q);

    if (parsed) {

        var q = parsed.domain + '.' + parsed.tld;

        cache.del('api/whois/' + q, function (err, deletions) {
            if (err) {
                fail(res, err);
            } else {
                res.send({
                    status: 'success',
                    data: deletions
                });
            }
        });
    } else {
        res.send({
            status: 'error',
            message: parsed
        });
    }
};