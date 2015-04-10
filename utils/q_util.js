var fs = require('fs');
var path = require('path');
var moment = require('moment');
var _ = require('lodash');

var id = moment().format('YYYY/MM/DD/HH');
var file = path.join(__dirname, '../data/q/' + id + '.log');

exports.read = function () {

    if (fs.existsSync(file)) {

        var data = fs.readFileSync(file, 'utf8');

        if (data) {
            return data.split('\n').slice(-10);
        }
    }
};

exports.write = function (res, q) {

    fs.exists(file, function (exists) {
        if (exists) {
            fs.readFile(file, 'utf8', function (err, data) {
                if (!err) {
                    if (_.indexOf(data.split('\n'), q) === -1) {
                        fs.appendFile(file, '\n' + q);
                    }
                }
            });
        } else {console.log(111);
            fs.writeFile(file, q);
        }
    });
    res.cookie('q', q);
};