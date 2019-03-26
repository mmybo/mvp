const User = require('../models/user');
const Product = require('../models/product');
const productForSale = require('../models/productForSale');
const jwt = require('jsonwebtoken');
const emailer = require('../services/sendgrid');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const DBURL = process.env.MONGODB_URI || 'mongodb://localhost/mmybo';

module.exports = function (app, upload) {

    //Create mongo connection
    // const conn = mongoose.connection;
    // Init Stream

    var conn = mongoose.createConnection(DBURL);
    conn.once('open', function () {

      var gfs = Grid(conn.db, mongoose.mongo);
      gfs.collection('user-pictures');//user-pictures is our collection name



      // GET authenticated user's profile page
      app.get('/profile/:id', (req, res) => {
          if (!req.user){
              return res.redirect('/signin?error=You are not signed in.');
          }else{

              User.findById(req.user._id).then(async(user) => {

                  //  if(file.contentType === 'image/jpeg' || file.contentType === 'image/png'){
                  //Grab User's Product Requests and their Products to Sell

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

      // Route for images that displays the ACTUAL image not just its data. For that we use gfs.createReadStream
      // Display Single file object
      app.get('/image/:filename', (req, res) => {
          console.log("Entered image get route!");

          // console.log("This is avatar:", req.user.avatar.id);

          gfs.files.findOne({filename: req.params.filename}, (err, file) => {
              //Check if any files exist
              if(!file || file.length === 0){
                  return res.status(404).json({
                      err: 'No file exist'
                  })
              }
              // Read output to broswer
              const readstream = gfs.createReadStream(file.filename);
              readstream.pipe(res);


          });
      });

  }) //End of gfs listener




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



    // POST signup
    app.post('/signup', upload.single('file'), async (req, res) => {

        console.log({file: req.file})

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


            newUser.avatar = String(req.file.filename)

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
