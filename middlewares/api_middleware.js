exports.index = function (req, res, next) {

    var headers = req.headers;
    var xRequestedWith = headers['x-requested-with'] && headers['x-requested-with'] === 'XMLHttpRequest';

    if (xRequestedWith && headers.referer) {
        next();
    } else {
        res.status(403).send('403 Forbidden');
    }
};