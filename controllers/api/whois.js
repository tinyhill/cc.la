var parseDomain = require('parse-domain');
var whois = require('node-whois');
var _ = require('lodash');

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
                    status: 'success',
                    data: _.trim(data).replace(/(\n|\r\n)/g, '<br>')
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

exports.refresh = function (req, res) {
    //todo
};