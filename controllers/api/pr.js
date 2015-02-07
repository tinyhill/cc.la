var PageRank = require('pagerank');
var parseDomain = require('parse-domain');

exports.index = function (req, res) {

    var q = parseDomain(req.params.q);

    if (q) {
        PageRank.HOST = 'toolbarqueries.google.com.hk';
        PageRank.get(q, function (err, data) {
            if (err || data === null) {
                res.send({
                    status: 'fail',
                    data: err
                });
            } else {
                res.send({
                    status: 'success',
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