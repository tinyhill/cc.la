var fs = require('fs');
var glob = require('glob');
var lineReader = require('line-reader');
var path = require('path');
var _ = require('lodash');

exports.index = function (req, res) {
    res.render('about', {
        active: 'about',
        layout: 'layouts/about_default',
        title: '关于本站',
        q: req.cookies.q
    });
};

exports.contact = function (req, res) {
    res.render('about/contact', {
        active: 'contact',
        layout: 'layouts/about_default',
        title: '联系我们',
        q: req.cookies.q
    });
};

exports.help = function (req, res) {
    res.render('about/help', {
        active: 'help',
        layout: 'layouts/about_default',
        title: '帮助中心',
        q: req.cookies.q
    });
};

exports.links = function (req, res) {
    res.render('about/links', {
        active: 'links',
        layout: 'layouts/about_default',
        title: '友情链接',
        q: req.cookies.q
    });
};

exports.sitemap = function (req, res) {

    var data = {
        id: req.params.id,
        lines: []
    };
    var file = null;

    if (data.id) {
        file = path.join(__dirname, '../data/q/' + data.id.replace(/_/g, '/') + '.log');
        fs.exists(file, function (exists) {
            if (exists) {
                lineReader.eachLine(file, function (line) {
                    data.lines.push(line);
                }).then(function () {
                    res.render('about/sitemap', data);
                });
            }
        });
    } else {
        file = path.join(__dirname, '../data/q/*/*/*/*.log');
        glob(file, function (err, files) {
            _.each(files, function (v) {
                data.lines.push(v.replace(/^(.*)\/data\/q\//, '').replace('.log', '').replace(/\//g, '_'));
            });
            res.render('about/sitemap', data);
        });
    }
};