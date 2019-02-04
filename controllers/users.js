const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = function (app) {

    // GET signup page
    app.get('/signup', (req, res) => {
        res.render('signup');
    });

    // GET signin page
    app.get('/signin', (req, res) => {
        res.render('signin');
    });

    // POST signup
    app.post('/signup', (req, res) => {
        const newUser = new User(req.body);
        newUser.save().then(user => {
            const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
            res.cookie(process.env.COOKIE, token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true });
            res.redirect('/');
        }).catch(error => {
            res.redirect('/?error=' + error);
        });
    });

    // POST signin
    app.post('/signin', (req, res) => {
        User.findOne({ email: req.body.email }, 'email password name').then(user => {
            user.comparePassword(req.body.password, (error, isMatch) => {
                if (isMatch) {
                    const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
                    res.cookie(process.env.COOKIE, token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true });
                    res.redirect(`/?success=Signed in as ${user.name}.`);
                } else {
                    res.redirect('/signin?error=Incorrect%20Password');
                }
                if (error) {
                    res.redirect('/signin?error=' + error);
                }
            });
        }).catch(error => {
            res.redirect('/signin?error=' + error);
        });
    });

    // GET signout
    app.get('/signout', (req, res) => {
        res.clearCookie(process.env.COOKIE);
        res.redirect('/');
    });

}