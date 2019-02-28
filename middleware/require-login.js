/* 
Assumes ./check-auth is being called before this middleware.
To use: Any route that requires an authenticated user should 
simply add this middleware to it.

Ex:
app.get('/mySecureRoute', require('../middleware/require-login'), (req, res) => { ... });
*/

module.exports = function (req, res, next) {
    if (!req.user) {
        res.redirect('/signin');
    } else {
        return next();
    }
}