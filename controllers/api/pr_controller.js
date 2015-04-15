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
                    PageRank.HOST = 'toolbarqueries.google.com.hk';
                    PageRank.USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36';
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