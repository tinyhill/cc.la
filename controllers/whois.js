exports.index = function (req, res) {
    res.render('whois', {
        layout: 'layouts/result'
    });
};