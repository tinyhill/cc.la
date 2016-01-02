var cache = require('express-redis-cache')();
var request = require('request');
var parseDomain = require('parse-domain');
var cheerio = require('cheerio');
var charset = require('charset');
var iconv = require('iconv-lite');
var robots = require('robots');
var url = require('url');
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

// 转换页面编码
function encode(res) {

    var body = res.body;
    var encoding = charset(res.headers, body) || 'utf8';

    if (encoding !== 'utf8') {
        return iconv.decode(body, encoding);
    } else {
        return body;
    }
}

// 解析网页链接
function parse(uri, cb) {

    var options = {
        uri: uri,
        followRedirect: true,
        encoding: null,
        timeout: 10000
    };

    request(options, function (err, res) {

        var data = {
            internal: {},
            external: {},
            res: res
        };

        if (err || res.statusCode !== 200) {
            cb(err, data);
        } else {

            var keys = ['miibeian', 'miitbeian'];
            var needle = url.parse(uri, false, true).host;

            $ = cheerio.load(encode(res));
            $('a[href]').each(function (k, v) {

                var text = _.trim($(v).text());
                var href = _.trim($(v).attr('href'));
                var parts = url.parse(href, false, true);
                var path = parts.pathname;

                // 排除非法链接
                if (parts.protocol === 'javascript:' || /^#/.test(href)) {
                    return true;
                }

                // 补全无协议链接
                if (/^\/\//.test(href)) {
                    href = 'http:' + href;
                }

                // 归档合法链接
                if (/^https?:\/\//.test(href)) {

                    var parsed = parseDomain(href);

                    if (parsed) {

                        var domain = parsed.domain + '.' + parsed.tld;
                        var host = parsed.subdomain ? parsed.subdomain + '.' + domain : domain;

                        // 排除备案链接
                        if (_.includes(keys, parsed.domain)) {
                            return true;
                        }

                        if (!new RegExp(domain + '$').test(needle)) {
                            if (!data.external[host]) {
                                data.external[host] = {
                                    text: $('img', v).length === 0 ? text : '图片链接',
                                    href: /^\/\//.test(href) ? 'http:' + href : href,
                                    nofollow: $(v).attr('rel') === 'nofollow'
                                };
                            }
                        } else {
                            data.internal[path] = {
                                text: text,
                                href: 'http://' + host + path
                            };
                        }
                    }
                } else {
                    data.internal[path] = {
                        text: text,
                        href: 'http://' + needle + path
                    };
                }
            });
            cb(null, data);
        }
    });
}

// 构造反链信息
function info(res, msg, link, count) {

    var redirect = !_.isEmpty(res.request.redirects);
    var nofollow = link.nofollow;
    var info = '';

    if (redirect && nofollow) {
        info = '<span style="color:#F39">有跳转&nbsp;&nbsp;，nofollow</span>&nbsp;&nbsp;';
    } else if (redirect && !nofollow) {
        info = '<span style="color:#F39">有跳转</span>&nbsp;&nbsp;';
    } else if (!redirect && nofollow) {
        info = '<span style="color:#F39">nofollow</span>&nbsp;&nbsp;';
    }

    return info + '<span style="color:green">' + msg + '</span>&nbsp;&nbsp;' +
        '链接词：<a href="' + link.href + '" target="_blank">' + link.text + '</a>&nbsp;&nbsp;' +
        '外链数：' + count;
}

// 获取反链情况
function fetch(parsed, q, cb) {

    var internal = parsed.internal;
    var external = parsed.external;
    var res = parsed.res;
    var regexp = /^www\./;

    // 判断响应码、资源类型
    if (res.statusCode >= 400) {
        cb(null, '<span style="color:red">无法访问</span>');
    } else if (res.headers['content-type'] && res.headers['content-type'].indexOf('text/html') === -1) {
        cb(null, '<span style="color:red">不是网页</span>');
    } else

    // 查询首页反链
    if (!_.isEmpty(external)) {

        var size = _.size(external);
        var idx = 0;

        _.each(external, function (v, k) {
            idx = idx + 1;
            if (q === k.replace(regexp, '')) {
                cb(null, info(res, '首页有反链', v, idx + '/' + size));
                return false;
            } else if (idx === size) {
                cb(null, '<span style="color:red">首页无反链</span>&nbsp;&nbsp;外链数：' + idx);
            }
        });
    }

    // 查询内页链接
    else {

        var cur = 0;
        var total = _.size(internal);

        _.each(internal, function (v) {
            cur = cur + 1;

            // 探测友链页
            if (v.text === '友情链接') {
                parse(v.href, function (err, parsed) {
                    if (err) {
                        cb(err, parsed);
                    } else {

                        var external = parsed.external;

                        if (!_.isEmpty(external)) {

                            var size = _.size(external);
                            var idx = 0;

                            _.each(external, function (v, k) {
                                idx = idx + 1;
                                if (q === k.replace(regexp, '')) {
                                    cb(null, info(res, '内页有反链', v, idx + '/' + size));
                                    return false;
                                } else if (idx === size) {
                                    cb(null, '<span style="color:red">首页内页均无反链</span>&nbsp;&nbsp;外链数：' + idx);
                                }
                            });
                        } else {
                            cb(null, '<span style="color:red">首页内页均无反链</span>&nbsp;&nbsp;外链数：0');
                        }
                    }
                });
            } else if (cur === total) {
                cb(null, '<span style="color:red">首页无反链</span>&nbsp;&nbsp;外链数：0');
            }
        });
    }
}

exports.index = function (req, res) {

    var parsed = parseDomain(req.params.q);

    if (parsed) {

        var domain = parsed.domain + '.' + parsed.tld;
        var host = parsed.subdomain ? parsed.subdomain + '.' + domain : domain;

        parse('http://' + host + '/', function (err, data) {
            if (err) {
                fail(res, err);
            } else {
                success(res, data.external);
            }
        });
    } else {
        error(res);
    }
};

exports.backlink = function (req, res) {

    var link = 'http://' + req.params.link + '/';
    var parsed = parseDomain(req.params.q);
    var spider = req.params.spider || null;

    if (parsed) {

        var q = parsed.domain + '.' + parsed.tld;
        var parser = new robots.RobotsParser();

        if (spider) {
            parser.setUrl(link + 'robots.txt', function (parser, status) {
                if (status) {
                    parser.canFetch(spider, '/', function (access) {
                        if (access) {
                            parse(link, function (err, parsed) {
                                fetch(parsed, q, function (err, fetched) {
                                    if (err) {
                                        fail(res, err);
                                    } else {
                                        success(res, fetched);
                                    }
                                });
                            });
                        } else {
                            success(res, '<span style="color:red">屏蔽蜘蛛访问</span>');
                        }
                    });
                } else {
                    fail(res, parser);
                }
            });
        } else {
            parse(link, function (err, parsed) {
                if (err) {
                    fail(res, err);
                } else {
                    fetch(parsed, q, function (err, fetched) {
                        if (err) {
                            fail(res, err);
                        } else {
                            success(res, fetched);
                        }
                    });
                }
            });
        }
    } else {
        error(res);
    }

};