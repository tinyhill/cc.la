var cache = require('express-redis-cache')();
var parseDomain = require('parse-domain');
var request = require('request');
var xml2js = require('xml2js');

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

function alexa(url, cb) {

    url = 'http://data.alexa.com/data?cli=10&url=' + url;

    request(url, function (err, resp, body) {
        if (err) {
            cb(new Error('Not Reached'));
        } else if (resp.statusCode !== 200) {
            cb(new Error('Not Fetched'));
        } else {
            xml2js.parseString(body, {
                normalizeTags: true,
                explicitArray: false
            }, function (err, result) {
                if (err) {
                    cb(new Error('Parse Error'));
                } else {

                    var sd = result.alexa.sd;

                    if (typeof sd !== 'undefined') {
                        cb(null, {
                            countryCode: sd.country ? sd.country.$.CODE : null,
                            countryRank: sd.country ? sd.country.$.RANK : null,
                            popularityText: sd.popularity ? sd.popularity.$.TEXT : null,
                            rankDelta: sd.rank ? sd.rank.$.DELTA : null
                        });
                    } else {
                        cb(null, null);
                    }
                }
            });
        }
    });
}

exports.index = function (req, res) {

    var q = req.params.q;
    var parsed = parseDomain(q);

    if (parsed) {
        q = parsed.domain + '.' + parsed.tld;
        q = parsed.subdomain ? parsed.subdomain + '.' + q : q;

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
                        if (err) {
                            fail(res, err);
                        } else {

                            var body = JSON.stringify(data);

                            success(res, data);
                            cache.add(key, body, {
                                expire: 3600 * 24
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