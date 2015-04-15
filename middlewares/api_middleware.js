exports.index = function (req, res, next) {

    var headers = req.headers;
    var xRequestedWith = headers['x-requested-with'] && headers['x-requested-with'] === 'XMLHttpRequest';
    var isLocal = req.hostname === '127.0.0.1';

    if (xRequestedWith && headers.referer || isLocal) {
        next();
    } else {
        res.status(403).send(null);
    }
};