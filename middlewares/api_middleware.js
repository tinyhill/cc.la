exports.index = function (req, res, next) {

    var headers = req.headers;

    if (headers['x-requested-with'] && headers['x-requested-with'] === 'XMLHttpRequest') {
        next();
    } else {
        res.status(401).send(null);
    }
};