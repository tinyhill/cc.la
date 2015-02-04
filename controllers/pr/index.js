var PageRank = require('pagerank');
var parse = require('domain-name-parser');

exports.index = function (req, res) {

    var host = parse(req.params.host);
    var domainName = host.domainName;

    PageRank.HOST = 'toolbarqueries.google.com.hk';
    PageRank.get(domainName, function (err, pr) {

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