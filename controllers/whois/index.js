var parse = require('domain-name-parser');
var whois = require('node-whois');

exports.index = function (req, res) {

    var host = parse(req.params.host);
    var domainName = host.domainName;

    whois.lookup(domainName, function (err, data) {

        var result = {};

        if (err) {
            result.status = 'fail';
            result.data = err;
        } else {
            result.status = 'success';
            result.data = data;
        }
        res.send(result);
    });
};