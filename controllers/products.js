const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const Product = require('../models/product');
const User = require('../models/user');
module.exports = function(app) {
    app.use(methodOverride('_method'))
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/products/new', (req, res) => {
    var currentUser = req.user;
    res.render('productRequest', { currentUser });
    })
    app.post('/products', (req, res) => {
        if (req.user) {
        const product = new Product(req.body);
        product.requester = req.user._id;
        //save instance to data
        product.save()
        .then(product => {
            return User.findById(req.user._id);
        })
        .then(user => {
            user.products.unshift(product);
            user.save();
            res.redirect('/products/' + product._id);
        })
        .catch(err => {
            console.log(err.message);
        });
        } else {
            return res.status(401).send({ message: "Something went wrong. Please make sure you are signed in" });
        }
    });
    app.get('/products/:id', (req, res) => {
    var currentUser = req.user;
    Product.findById(req.params.id).then((product) => {
        res.render('show-products', { product, currentUser })
    }).catch((err) => {
        console.log(err.message);
        })
    })
    app.get('/products/:id/edit', (req, res) => {
    var currentUser = req.user;
    Product.findById(req.params.id, function(err, product) {
        res.render('edit-product', { product, currentUser });
        })
    })
    //TODO: Need to figure out the logic for what happens when a user makes a bid.
    //Does it post to the product, then open a chatroom?
    //would presumably have to create a chatroom each time, and check if bidding User
    //has already created on for product
}
