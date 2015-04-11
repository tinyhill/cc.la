var fs = require('fs');
var path = require('path');
var moment = require('moment');
var mkdirp = require('mkdirp');
var _ = require('lodash');

var dirPrefix = '../data/q';
var now = moment();

exports.read = function () {

    var file = path.join(__dirname, dirPrefix, now.format('YYYY/MM/DD/HH') + '.log');

    if (fs.existsSync(file)) {

        var data = fs.readFileSync(file, 'utf8');

        if (data) {
            return data.split('\n').slice(-10);
        }
    }
};

exports.write = function (res, q) {

    var file = path.join(__dirname, dirPrefix, now.format('YYYY/MM/DD/HH') + '.log');

    fs.exists(file, function (exists) {
        if (exists) {
            fs.readFile(file, 'utf8', function (err, data) {
                if (!err) {
                    if (_.indexOf(data.split('\n'), q) === -1) {
                        fs.appendFile(file, '\n' + q);
                    }
                }
            });
        } else {

            var ymd = now.format('YYYY/MM/DD');
            var dir = path.join(__dirname, dirPrefix, ymd);

            mkdirp(dir, function (err) {
                if (!err) {
                    fs.writeFile(file, q);
                }
            });
        }
    });
    res.cookie('q', q);
};