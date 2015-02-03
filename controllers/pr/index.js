var PageRank = require('pagerank');

exports.index = function (req, res) {

    var host = req.params.host;

    PageRank.HOST = 'toolbarqueries.google.com.hk';
    PageRank.get(host, function (err, pr) {

        var result = {};

        if (err) {
            result.status = 'fail';
            result.data = err;
        } else {
            result.status = 'success';
            result.data = pr;
        }
        res.json(result);
    });
};