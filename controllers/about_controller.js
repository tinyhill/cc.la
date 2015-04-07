var lineReader = require('line-reader');
var path = require('path');

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

    var id = req.params.id;
    var data = {
        id: id,
        lines: []
    };

    if (id) {

        var log = '../data/q/' + id.replace(/_/g, '/') + '.log';
        var file = path.join(__dirname, log);

        lineReader.eachLine(file, function (line) {
            data.lines.push(line);
        });
    }

    res.render('about/sitemap', data);
};