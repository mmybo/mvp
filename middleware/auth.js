// This middleware checks if there is an authenticated user in every request
const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.cookies[process.env.COOKIE]) {
        const uid = jwt.decode(req.cookies[process.env.COOKIE], process.env.SECRET)._id;
        User.findById(uid).then(user => {
            req.user = user;
            res.locals.authenticatedUser = user;
            return next();
        });
    } else {
        res.user = null;
        return next();
    }
}