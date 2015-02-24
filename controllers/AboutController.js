exports.index = function (req, res) {
    res.render('about', {
        active: 'about',
        layout: 'layouts/about_default',
        title: '关于本站'
    });
};

exports.contact = function (req, res) {
    res.render('about/contact', {
        active: 'contact',
        layout: 'layouts/about_default',
        title: '联系我们'
    });
};

exports.help = function (req, res) {
    res.render('about/help', {
        active: 'help',
        layout: 'layouts/about_default',
        title: '帮助中心'
    });
};

exports.links = function (req, res) {
    res.render('about/links', {
        active: 'links',
        layout: 'layouts/about_default',
        title: '友情链接'
    });
};