var fs = require('fs');
var path = require('path');
var moment = require('moment');
var mkdirp = require('mkdirp');
var _ = require('lodash');

exports.read = function () {

    var file = path.join(__dirname, '../data/q', moment().format('YYYY/MM/DD/HH') + '.log');

    if (fs.existsSync(file)) {

        var data = fs.readFileSync(file, 'utf8');

        if (data) {
            return data.split('\n').slice(-10);
        }
    }
};

exports.write = function (res, q) {

    var now = moment();
    var file = path.join(__dirname, '../data/q', now.format('YYYY/MM/DD/HH') + '.log');

    fs.exists(file, function (exists) {
        if (exists) {
            fs.readFile(file, 'utf8', function (err, data) {
                if (!err) {
                    data = _.union(data, ['www.cc.la', 'cc.la']);
                    if (_.indexOf(data.split('\n'), q) === -1) {
                        fs.appendFile(file, '\n' + q);
                    }
                }
            });
        } else {

            var dir = path.join(__dirname, '../data/q', now.format('YYYY/MM/DD'));

            mkdirp(dir, function (err) {
                if (!err) {
                    fs.writeFile(file, q);
                }
            });
        }
    });
    res.cookie('q', q);
};