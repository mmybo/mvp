const User = require('../models/user');
const forSaleItem = require('../models/forSaleProduct');

// TODO: Route not here, but when rendering the profile, render the forSaleItems wrapped in a href tags to edit the form and resubmit
// TODO: If time available, integrate google search image api
// NOTE: In other words, first create the forSaleProduct list and then worry about Editing and Deleting

module.exports = function(app){

    app.get('/product-for-sale-form', (req, res) => {
        res.render('product-for-sale-form');
    })

    app.post('/products-for-sale', (req, res) => {

        if (req.user){
        forSaleProduct = new forSaleProduct(req.body);
        forSaleProduct.owner = req.user._id

        forSaleProduct.save().then((forSaleProduct) => {
            return User.findById(forSaleProduct.owner)
        }).then((user) => {
            user.forSaleProduct.unshift(forSaleProduct);
            user.save();
            res.redirect(`/profile/${req.user._id}`);
        }).catch(err => {
            console.log(err);
        })
    } else {
            return res.status(401).send({ message: "Something went wrong. Please make sure you are signed in" });
        }

    });






    app.get('/products-for-sale/new', (req, res) => {
        var currentUser = req.user;
        res.render('products-for-sale-form', { currentUser });
    });


    app.get('/products-for-sale/:id/edit', (req, res) => {
        var currentUser = req.user;
        Product.findById(req.params.id, function (err, product) {
            res.render('edit-products-for-sale', { product, currentUser });
        })
    })
    app.put('/products-for-sale/:id/', (req, res) => {
        Product.findByIdAndUpdate(req.params.id, req.body)
            .then(product => {
                res.redirect(`/products-for-sale/${product._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })

    app.delete('/products-for-sale/:id', function (req, res) {
        console.log("DELETE product-for-sale");
        Product.findByIdAndRemove(req.params.id).then((product) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })



}
