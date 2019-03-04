const Product = require('../models/product');
const User = require('../models/user');
const ImageSuggestor = require('../services/image-suggestor');
module.exports = function (app) {
    app.get('/appliances', (req, res) => {
        // var fauxProducts = require('../data/mockData').products;
        Product.find({ category: "appliances" })
        .then(products => {
            res.render("index", { products, products});
        })
        .catch(err => {
            console.log(err);
        });
    })
    app.get('/books', (req, res) => {
        // var fauxProducts = require('../data/mockData').products;
        Product.find({ category: "books" })
        .then(products => {
            res.render("index", { products, products});
        })
        .catch(err => {
            console.log(err);
        });
    })
    app.get('/computers', (req, res) => {
        // var fauxProducts = require('../data/mockData').products;
        Product.find({ category: "computers" })
        .then(products => {
            res.render("index", { products, products});
        })
        .catch(err => {
            console.log(err);
        });
    })
    app.get('/electronics', (req, res) => {
        // var fauxProducts = require('../data/mockData').products;
        Product.find({ category: "electronics" })
        .then(products => {
            res.render("index", { products, products});
        })
        .catch(err => {
            console.log(err);
        });
    })
    app.get('/movies-tv', (req, res) => {
        // var fauxProducts = require('../data/mockData').products;
        Product.find({ category: "movies-tv" })
        .then(products => {
            res.render("index", { products, products});
        })
        .catch(err => {
            console.log(err);
        });
    })
    app.get('/music', (req, res) => {
        // var fauxProducts = require('../data/mockData').products;
        Product.find({ category: "music" })
        .then(products => {
            res.render("index", { products, products});
        })
        .catch(err => {
            console.log(err);
        });
    })
    app.get('/phones', (req, res) => {
        // var fauxProducts = require('../data/mockData').products;
        Product.find({ category: "phones" })
        .then(products => {
            res.render("index", { products, products});
        })
        .catch(err => {
            console.log(err);
        });
    })
    app.get('/sports-outdoor', (req, res) => {
        // var fauxProducts = require('../data/mockData').products;
        Product.find({ category: "sports-outdoor" })
        .then(products => {
            res.render("index", { products, products});
        })
        .catch(err => {
            console.log(err);
        });
    })
    app.get('/video-games', (req, res) => {
        // var fauxProducts = require('../data/mockData').products;
        Product.find({ category: "video-games" })
        .then(products => {
            res.render("index", { products, products});
        })
        .catch(err => {
            console.log(err);
        });
    })
}
