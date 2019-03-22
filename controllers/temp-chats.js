const http = require('http');
//we need to use http ourselves and configure it with express
const { generateMessage, generateLocationMessage } = require('../services/message');
const { isRealString } = require('../services/string-validation');
const requireLogin = require('../middleware/require-login');
const User = require('../models/user');
const Product = require('../models/product');
const Chatroom = require('../models/chatroom');

module.exports = function (app) {


    app.get('/chatroom', (req, res) => {
        res.render('chatroom.hbs')
    })


    app.post('/chats', requireLogin, (req, res) => {
        Chatroom.find({channel: req.body.channel, requester: req.body.requester, bidderId: req.body.bidderId}).then((chatroom) => {
            // If chatroom with the same name, and people involved already exists, just redirect to the manage offers page
            console.log(chatroom);

            if(chatroom === undefined || chatroom.length == 0){
                chatroom = new Chatroom(req.body);

                chatroom.save().then((chatroom) => {
                    // Adding this chatroom to the requester's list of chatrooms
                    /* User.findOneAndUpdate({ _id: chatroom.requester }, { $push: { chatrooms: chatroom } });  <-- Why doesn't this work? */
                    User.findById(chatroom.requester).then(user => {
                        user.chatrooms.unshift(chatroom);
                        user.save();
                    });

                    // Incriment number of offers on product and add bidder to it's list of bidders
                    /* Product.findOneAndUpdate({ _id: chatroom.productId }, { $inc: { offers: 1 } });  <-- Why doesn't this work?
                       Product.findOneAndUpdate({ _id: chatroom.productId }, { $push: { bidders: chatroom.bidderId } });  <-- Why doesn't this work? */
                    Product.findById(chatroom.productId).then(product => {
                        product.bidders.unshift(chatroom.bidderId);
                        product.offers += 1;
                        product.save();
                    });

                    // Append new chatroom to authenticatedUser's chatroom's array

                    req.user.chatrooms.unshift(chatroom)
                    req.user.save();


                    res.redirect(`manage-offers/${req.user._id}`);


                    console.log("CHATROOM CREATED");

            });
            }else{
                return res.redirect(`/manage-offers/${req.user._id}`)
            } //End else

    });
});




    app.get('/manage-offers/:id', requireLogin, async(req, res) => {

        var userChatrooms = [];

        // NOTE: This operation is taking too long
        for(chatroomId of req.user.chatrooms){
          await Chatroom.findById(chatroomId).then(chatroom => {
            userChatrooms.unshift(chatroom)
        }).catch(err => {
            console.log("Looping over current user chatroom error:", err);
            })
        }


        // console.log("User's chat rooms:", userChatrooms);

        res.render('temp-chatroom.hbs', {userChatrooms}) // TODO: Trying to pass in an array of req.user's chatrooms and render all of them in the sidebar


    })

}
