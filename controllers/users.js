const User = require('../models/user');
const Product = require('../models/product');
const productForSale = require('../models/productForSale');
const jwt = require('jsonwebtoken');
const emailer = require('../services/sendgrid');

module.exports = function (app) {

    // GET signup page
    app.get('/signup', (req, res) => {
        res.render('signup');
    });

    // GET signin page
    app.get('/signin', (req, res) => {
        res.render('signin');
    });

    // GET profile page
    app.get('/users/:id', (req, res) => {
        User.findById(req.params.id).then(user => {
            res.render('profile', { user });
        });
    });

    // GET authenticated user's profile page
    app.get('/profile/:id', (req, res) => {
        if (!req.user){
            return res.redirect('/signin?error=You are not signed in.');
        }else{

            User.findById(req.user._id).then(async(user) => {

                var userProducts = []
                var userProductsToSell = []

                await Product.find({requester: req.user._id}).then((products) => {
                    for (i = 0; i < products.length; i++) {
                          userProducts.push(products[i]);
                        }
                })
                await productForSale.find({owner: req.user._id}).then((productsForSale) => {
                    for (i = 0; i < productsForSale.length; i++) {
                          userProductsToSell.push(productsForSale[i]);
                        }
                })
                console.log("Products found:", userProducts);
                console.log("productsForSale found:", userProductsToSell);

                res.render('user-profile', { user: req.user, productRequests: userProducts, productsForSale: userProductsToSell});

            })

            // console.log("userProducts:",userProducts);
            // console.log("userProductsToSell:",userProductsToSell);


        }

    });

    // POST signup
    app.post('/signup', async (req, res) => {
        // Check if the user already exists
        const user = await User.findOne({ email: req.body.email }, 'email password name');
        if (user) {
            user.comparePassword(req.body.password, (error, matched) => {
                if (error) {
                    // Don't send them the real error because they'll go to the sign in page and try again anyway
                    return res.redirect(`/signup?error=${req.body.email} is already associated with an account on MMYBO.`);
                }
                if (matched) {
                    const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
                    res.cookie(process.env.COOKIE, token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true });
                    res.redirect(`/?success=You already have an account on MMYBO. We signed you in, ${user.name}.`);
                } else {
                    res.redirect(`/signup?error=${req.body.email} is already associated with an account on MMYBO.`);
                }
            });
        } else {
            const newUser = new User(req.body);
            newUser.save().then(user => {
                emailer.sendWelcomeEmail(user.name, user.email);
                const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
                res.cookie(process.env.COOKIE, token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true });
                res.redirect(`/?success=We've created your account and signed you in, ${user.name}.`);
            }).catch(error => {
                res.redirect('/signup?error=' + error);
            });
        }
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
                    res.redirect('/signin?error=Incorrect Password.');
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
