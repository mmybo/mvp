// This middleware checks to see wheter or not a chatroom exists in a User's account
// If the chatroom does exist then we will grant that user access to reload that chat in their "Manage Offers" page

//NOTE: Use cases of this middleware is primarily when a User is in their "Manage Offers" page and they are trying to
        // access one of their channel


//TODO: Change paths when integrating in your branch
const User = require('../models/user');
const Chatroom = require('../models/chatroom')


//TODO: Confirm if user is either a requester or provider to grant access to the chatroom.
var findChatroom = function (req, res, next) {

    // /chatrooms/:id

    body = req.body
    user = req.user

    //Checks to see if current user has the chatroom id in their array of chatrooms
    if (req.user.chatrooms.includes(req.params.id)) {

    }



    //TODO: Is is possible to pass in a conditional for find()? I'm trying to identify if the user passed in is either a requester or provider
    Chatroom.find({requester: body.user | provider: body.user})

    //TODO: Middleware: Pass in a user object and if user is not either the requester or as a bidder, send back to index page
                // If they are either, then grant access to the chatroom


}


module.exports = {findChatroom}
