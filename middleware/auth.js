// This middleware checks if there is an authenticated user in every request
const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.cookies.UnToken) {
        const uid = jwt.decode(req.cookies.UnToken, process.env.CLIENT_SECRET)._id;
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