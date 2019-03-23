const Product = require('../models/product');
const User = require('../models/user');
const ImageSuggestor = require('../services/image-suggestor');

module.exports = function (app) {

    app.get('/', (req, res) => {
        Product.find().populate('requester').then(products => {
            res.render('index', { products });
        }).catch(console.error);
    });

    app.get('/landing-page', (req, res) => {
        res.render('landing');
    });


// When the user uses the search bar
    app.get('/search', (req, res) => {
        // console.log("IM IN SEARCH ROUTE!");
        term = new RegExp(req.query.term, 'i')

        Product.find({$or:[{'name': term}, {'category': term}, {'description': term}]}).then(products => {
            res.render('index', { products });
        }).catch(console.error);
    });

    app.get('/r/:category', (req, res) => {
        Product.find({ category: req.params.category })
            .populate('requester').then(products => {
                res.render("index", { products });
            }).catch(console.error);
    });

    app.get('/products/new', (req, res) => {
        var currentUser = req.user;
        res.render('productRequest', { currentUser });
    });

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
            res.render('show-product', { product, currentUser })
        }).catch((err) => {
            console.log(err.message);
        })
    })
    app.get('/products/:id/edit', (req, res) => {
        var currentUser = req.user;
        Product.findById(req.params.id, function (err, product) {
            res.render('edit-product', { product, currentUser });
        })
    })
    app.put('/products/:id/', (req, res) => {
        Product.findByIdAndUpdate(req.params.id, req.body)
            .then(product => {
                res.redirect(`/products/${product._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })

    app.delete('/products/:id', function (req, res) {
        console.log("It is time for this product request... to end")
        Product.findByIdAndRemove(req.params.id).then((product) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })

    /* API route for getting links to images based on text */
    app.post('/suggestedImages', (req, res) => {
        ImageSuggestor.getImages(req.body.text).then(links => {
            res.json({ links });
        }).catch(error => {
            res.status(500).json({ error });
        });
    });

    //TODO: Need to figure out the logic for what happens when a user makes a bid.
    //Does it post to the product, then open a chatroom?
    //would presumably have to create a chatroom each time, and check if bidding User
    //has already created on for product
}
