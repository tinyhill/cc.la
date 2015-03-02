var cache = require('express-redis-cache')();
var needle = require('needle');
var parseDomain = require('parse-domain');
var cheerio = require('cheerio');
var _ = require('lodash');

var model = require('../../models/IndexedModel');

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

    var fn = exports[req.params.engine];

    if (fn) {
        fn(req, res);
    }
};

exports.baidu = function (req, res) {

    var cmd = req.params.cmd;
    var period = req.params.period;
    var periodKey = period ? '/' + period : '';
    var periodParams = period ? '&lm=' + period : '';
    var parsed = parseDomain(req.params.q);

    if (parsed) {

        var q = parsed.domain + '.' + parsed.tld;
        var key = 'api/indexed/baidu/' + cmd + '/' + q + periodKey;

        cache.get(key, function (err, entries) {
            if (err) {
                fail(res, err);
            } else {

                var body = entries[0] ? entries[0].body : null;

                if (body) {
                    success(res, body);
                } else {

                    var url = 'http://www.baidu.com/s?wd=';

                    switch (cmd) {
                        case 'cached':
                            url += 'http://' + q;
                            break;
                        case 'position':
                            url += 'site%3A' + q;
                            break;
                        default:
                            url += cmd + '%3A' + q;
                    }
                    needle.get(url + periodParams, function (err, result) {

                        var data = null;

                        if (err || result.statusCode !== 200) {
                            fail(res, err);
                        } else {
                            $ = cheerio.load(result.body);
                            if (cmd === 'cached') {
                                data = _.trim($('span.g').first().text());
                                if (new RegExp('^(www.)?' + q + '\/').test(data)) {

                                    var match = data.match(/(\d{4}-\d{2}-\d{2})(&nbsp;)?$/);

                                    data = _.isArray(match) && match[1] ? match[1] : '暂无快照';
                                } else {
                                    data = '暂无快照';
                                }
                            } else if (cmd === 'position') {
                                data = '暂无信息';
                                $('span.g').each(function (k, v) {

                                    var text = $(v).text().replace(/^www./, '');

                                    if (text.substr(0, q.length + 1) === q + '/') {
                                        data = k + 1;
                                        return false;
                                    }
                                });
                            } else {
                                data = $('.nums').text();
                                data = _.trim(data.replace(/[\u4e00-\u9fa5]+/g, '')) || '0';
                            }
                            cache.add(key, data, {
                                expire: 3600 * 24
                            }, function () {
                                success(res, data);
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

exports.haosou = function (req, res) {

    var cmd = req.params.cmd;
    var parsed = parseDomain(req.params.q);

    if (parsed) {

        var q = parsed.domain + '.' + parsed.tld;
        var key = 'api/indexed/haosou/' + cmd + '/' + q;

        cache.get(key, function (err, entries) {
            if (err) {
                fail(res, err);
            } else {

                var body = entries[0] ? entries[0].body : null;

                if (body) {
                    success(res, body);
                } else {

                    var url = 'http://www.haosou.com/s?q=' + cmd + '%3A' + q;

                    needle.get(url, function (err, result) {

                        var data = null;

                        if (err || result.statusCode !== 200) {
                            fail(res, err);
                        } else {
                            $ = cheerio.load(result.body);
                            data = $('.nums').text();
                            data = _.trim(data.replace(/[\u4e00-\u9fa5]+/g, '')) || '0';
                            cache.add(key, data, {
                                expire: 3600 * 24
                            }, function () {
                                success(res, data);
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

exports.sogou = function (req, res) {

    var cmd = req.params.cmd;
    var parsed = parseDomain(req.params.q);

    if (parsed) {

        var q = parsed.domain + '.' + parsed.tld;
        var key = 'api/indexed/sogou/' + cmd + '/' + q;

        cache.get(key, function (err, entries) {
            if (err) {
                fail(res, err);
            } else {

                var body = entries[0] ? entries[0].body : null;

                if (body) {
                    success(res, body);
                } else {

                    var url = 'http://www.sogou.com/web?query=' + cmd + '%3A' + q;

                    needle.get(url, function (err, result) {

                        var data = null;

                        if (err || result.statusCode !== 200) {
                            fail(res, err);
                        } else {
                            $ = cheerio.load(result.body);
                            data = $('#scd_num').text() || '0';
                            cache.add(key, data, {
                                expire: 3600 * 24
                            }, function () {
                                success(res, data);
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

exports.google = function (req, res) {

    var cmd = req.params.cmd;
    var parsed = parseDomain(req.params.q);

    if (parsed) {

        var q = parsed.domain + '.' + parsed.tld;
        var key = 'api/indexed/google/' + cmd + '/' + q;

        cache.get(key, function (err, entries) {
            if (err) {
                fail(res, err);
            } else {

                var body = entries[0] ? entries[0].body : null;

                if (body) {
                    success(res, body);
                } else {

                    var url = 'http://61.219.131.118/search?q=' + cmd + '%3A' + q + '&hl=zh_CN';

                    needle.get(url, function (err, result) {

                        var data = null;

                        if (err || result.statusCode !== 200) {
                            fail(res, err);
                        } else {
                            $ = cheerio.load(result.body);
                            data = $('#resultStats').text().split(' ');
                            data = data[1] ? data[1] : '0';
                            cache.add(key, data, {
                                expire: 3600 * 24
                            }, function () {
                                success(res, data);
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