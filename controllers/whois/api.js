var parseDomain = require('parse-domain');
var whois = require('node-whois');

exports.index = function (req, res) {

    var q = parseDomain(req.params.q);

    if (q) {
        q = q.domain + '.' + q.tld;
        whois.lookup(q, function (err, data) {
            if (err) {
                res.send({
                    status: 'fail',
                    data: err
                });
            } else {
                res.send({
                    status: 'fail',
                    data: data
                });
            }
        });
    } else {
        res.send({
            status: 'error',
            message: q
        });
    }
};