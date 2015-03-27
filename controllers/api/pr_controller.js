var cache = require('express-redis-cache')();
var PageRank = require('pagerank');
var parseDomain = require('parse-domain');

var model = require('../../models/pr_model');

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

    var parsed = parseDomain(req.params.q);

    if (parsed) {

        var q = parsed.domain + '.' + parsed.tld;
        var key = 'api/pr/' + q;

        cache.get(key, function (err, entries) {
            if (err) {
                fail(res, err);
            } else {

                var body = entries[0] ? entries[0].body : null;

                if (body) {
                    success(res, body);
                } else {
                    PageRank.HOST = 'toolbarqueries.google.com.hk';
                    PageRank.get(q, function (err, data) {
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