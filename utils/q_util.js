var fs = require('fs');
var path = require('path');
var moment = require('moment');
var mkdirp = require('mkdirp');
var _ = require('lodash');

function fullpath(p) {
    return path.join(__dirname, '../data/q', p);
}

exports.read = function () {

    var now = moment();
    var file = fullpath(now.format('YYYY/MM/DD/HH') + '.log');

    if (fs.existsSync(file)) {

        var data = fs.readFileSync(file, 'utf8');

        if (data) {
            return data.split('\n').slice(-10);
        }
    }
};

exports.write = function (res, q) {

    var now = moment();
    var file = fullpath(now.format('YYYY/MM/DD/HH') + '.log');

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

            var dir = fullpath(now.format('YYYY/MM/DD'));

            mkdirp(dir, function (err) {
                if (!err) {
                    fs.writeFile(file, q);
                }
            });
        }
    });
    res.cookie('q', q);
};