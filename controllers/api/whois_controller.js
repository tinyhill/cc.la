var cache = require('express-redis-cache')();
var parseDomain = require('parse-domain');
var whois = require('node-whois');
var _ = require('lodash');

var model = require('../../models/whois_model');

function success(res, data) {

    var raw = data.raw;

    data.raw = _.trim(raw).replace(/(\n|\r\n)/g, '<br>');
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
                    success(res, JSON.parse(body));
                } else {
                    whois.lookup(q, function (err, raw) {
                        if (err) {
                            fail(res, err);
                        } else {

                            var data = {
                                raw: raw
                            };
                            var body = JSON.stringify(data);

                            success(res, data);
                            cache.add(key, body, {
                                expire: 3600 * 24 * 30
                            }, function () {
                                model.create({
                                    body: body,
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
        error(res);
    }
};