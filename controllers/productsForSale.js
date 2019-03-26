const User = require('../models/user');
const productForSale = require('../models/productForSale');

// TODO: Route not here, but when rendering the profile, render the productsForSale wrapped in a href tags to edit the form and resubmit
// TODO: If time available, integrate google search image api
// NOTE: In other words, first create the productForSale list and then worry about Editing and Deleting

module.exports = function(app){


    app.get('/products-for-sale/new', (req, res) => {
        var currentUser = req.user;
        res.render('product-for-sale-form', { currentUser });
    });


    app.post('/products-for-sale', (req, res) => {

        if (req.user){

        productToSell = new productForSale(req.body);
        productToSell.owner = req.user._id

        productToSell.save().then((productToSell) => {
            return User.findById(productToSell.owner)
        }).then((user) => {
            user.productsForSale.unshift(productToSell);
            user.save();
            console.log("Created New productToSell:", productToSell);
            res.redirect(`/profile/${req.user._id}`);
        }).catch(err => {
            console.log(err);
        })
    } else {
            return res.status(401).send({ message: "Something went wrong. Please make sure you are signed in" });
        }

    });

    // TODO: Need to make edit page for productsForSale
    app.get('/products-for-sale/:id/edit', (req, res) => {

        // console.log("req: ", req.params.id);
        var currentUser = req.user;
        productForSale.find({owner: req.user._id, _id: req.params.id}, function (err, productToSell) {
            console.log("Im Editing This: ", productToSell[0]);
            var productForSale = productToSell[0]
            res.render('edit-products-for-sale', { productForSale, currentUser });
        })
    })
    app.put('/products-for-sale/:id/', (req, res) => {
        console.log("Trying to make PUT req with:", req.body);
        productForSale.findByIdAndUpdate(req.params.id, req.body)
            .then(productForSale => {
                res.redirect(`/profile/${req.user._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })

    app.delete('/products-for-sale/:id', function (req, res) {
        console.log("DELETE product-for-sale");
        productForSale.findByIdAndRemove(req.params.id).then((productForSale) => {
            res.redirect(`/profile/${req.user._id}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })



}
