var cache = require('express-redis-cache')();
var needle = require('needle');
var parseDomain = require('parse-domain');
var cheerio = require('cheerio');
var _ = require('lodash');

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

    var fn = exports[req.params.e];

    if (fn) {
        fn(req, res);
    }
};

exports.baidu = function (req, res) {

    var c = req.params.c;
    var cmds = ['site', 'link'];

    if (_.includes(cmds, c)) {

        var parsed = parseDomain(req.params.q);

        if (parsed) {

            var q = parsed.domain + '.' + parsed.tld;
            var key = 'api/indexed/baidu/' + c + '/' + q;

            cache.get(key, function (err, entries) {
                if (err) {
                    fail(res, err);
                } else {

                    var body = entries[0] ? entries[0].body : null;

                    if (body) {
                        success(res, body);
                    } else {
                        c = c === 'link' ? 'domain' : c;

                        var url = 'http://www.baidu.com/s?wd=' + c + '%3A' + q;

                        needle.get(url, function (err, data) {
                            if (err || data.statusCode !== 200) {
                                fail(res, err);
                            } else {
                                $ = cheerio.load(data.body);
                                data = $('.nums').text();
                                data = _.trim(data.replace(/[\u4e00-\u9fa5]+/g, ''));
                                cache.add(key, data, {
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
    } else {
        error(res);
    }
};

exports.haosou = function (req, res) {

    var c = req.params.c;
    var cmds = ['site', 'link'];

    if (_.includes(cmds, c)) {

        var parsed = parseDomain(req.params.q);

        if (parsed) {

            var q = parsed.domain + '.' + parsed.tld;
            var key = 'api/indexed/haosou/' + c + '/' + q;

            cache.get(key, function (err, entries) {
                if (err) {
                    fail(res, err);
                } else {

                    var body = entries[0] ? entries[0].body : null;

                    if (body) {
                        success(res, body);
                    } else {

                        var query = c === 'link' ? '"' + q + '"' : c + '%3A' + q;
                        var url = 'http://www.haosou.com/s?q=' + query;

                        needle.get(url, function (err, data) {
                            if (err || data.statusCode !== 200) {
                                fail(res, err);
                            } else {
                                $ = cheerio.load(data.body);
                                data = $('.nums').text();
                                data = _.trim(data.replace(/[\u4e00-\u9fa5]+/g, ''));
                                cache.add(key, data, {
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
    } else {
        error(res);
    }
};

exports.sogou = function (req, res) {

    var c = req.params.c;
    var cmds = ['site', 'link'];

    if (_.includes(cmds, c)) {

        var parsed = parseDomain(req.params.q);

        if (parsed) {

            var q = parsed.domain + '.' + parsed.tld;
            var key = 'api/indexed/sogou/' + c + '/' + q;

            cache.get(key, function (err, entries) {
                if (err) {
                    fail(res, err);
                } else {

                    var body = entries[0] ? entries[0].body : null;

                    if (body) {
                        success(res, body);
                    } else {

                        var query = c === 'link' ? '"' + q + '"' : c + '%3A' + q;
                        var url = 'http://www.sogou.com/web?query=' + query;

                        needle.get(url, function (err, data) {
                            if (err || data.statusCode !== 200) {
                                fail(res, err);
                            } else {
                                $ = cheerio.load(data.body);
                                data = $('#scd_num').text();
                                cache.add(key, data, {
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
    } else {
        error(res);
    }
};

exports.google = function (req, res) {

    var c = req.params.c;
    var cmds = ['site', 'link'];

    if (_.includes(cmds, c)) {

        var parsed = parseDomain(req.params.q);

        if (parsed) {

            var q = parsed.domain + '.' + parsed.tld;
            var key = 'api/indexed/google/' + c + '/' + q;

            cache.get(key, function (err, entries) {
                if (err) {
                    fail(res, err);
                } else {

                    var body = entries[0] ? entries[0].body : null;

                    if (body) {
                        success(res, body);
                    } else {

                        var url = 'http://216.58.217.35/search?q=' + c + '%3A' + q + '&hl=zh_CN';

                        needle.get(url, function (err, data) {
                            if (err || data.statusCode !== 200) {
                                fail(res, err);
                            } else {
                                $ = cheerio.load(data.body);
                                data = $('#resultStats').text().split(' ');
                                data = data[1] ? data[1] : '0';
                                cache.add(key, data, {
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
    } else {
        error(res);
    }
};