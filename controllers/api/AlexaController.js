var alexa = require('alexarank');
var cache = require('express-redis-cache')();
var parseDomain = require('parse-domain');

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
        var key = 'api/alexa/' + q;

        cache.get(key, function (err, entries) {
            if (err) {
                fail(res, err);
            } else {

                var body = entries[0] ? entries[0].body : null;

                if (body) {
                    success(res, JSON.parse(body));
                } else {
                    alexa(q, function (err, data) {
                        if (err || data === null) {
                            fail(res, err);
                        } else {
                            cache.add(key, JSON.stringify(data), {
                                expire: 3600 * 24
                            }, function () {
                                success(res, data);
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