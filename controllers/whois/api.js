var parseDomain = require('parse-domain');
var whois = require('node-whois');

exports.index = function (req, res) {

    var q = req.params.q;
    var parsed = parseDomain(q);

    if (parsed) {
        q = parsed.domain + '.' + parsed.tld;
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
            message: parsed
        });
    }
};