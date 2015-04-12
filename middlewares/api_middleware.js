exports.index = function (req, res, next) {
    if (req['X-Requested-With'] && req['X-Requested-With'] === 'XMLHttpRequest') {
        next();
    } else {
        res.status(401).render('error', {
            message: 'Unauthorized'
        });
    }
};