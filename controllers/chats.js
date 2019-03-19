const socketIO = require('socket.io');
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

        const chatroom = new Chatroom(req.body);

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

            res.redirect('/manage-offers');
        });

    });




    var server = http.createServer(app)
    var io = socketIO(server) //This is our websocket server, how we communicate between server and client

    app.get('/manage-offers/:id', requireLogin, (req, res) => {

        userChatrooms = req.user.chatrooms // Array of all chatrooms that user is associated with

        res.render('chatroom.hbs', { userChatrooms })


        // For each chatroom, grab id and channel name, and generate a div tag its content = Channel string.
        // Each div needs to emit a socket event that sends the chatroom object back so that the server can join a socket room based on chatroom._id
        //TODO in JQuery/JS file: Instead of listening for a socket event, I need to access a ".userChatrooms" class and append a <div a href> for each chatroom in the user array when the page FIRST LOADS UP (NO SOCKET LISTENING)


        //Find all the chatrooms of the user who hits the route


        // TODO: Need to render the manage offers page, with userChatrooms injecting each chatroom into a div into sidebar
        // TODO: When Channel is clicked, it should join the socket room using the chatroom._id (STRETCH CHALLENGE)it should reload the chat with chatroom.messages array based off the timestamped messages




        //lets you register an event listener
        // built in event listener like connection lets you listen when a client connects to the server
        // 'socket' which is passed into the callback represents the individual socket as opposed to all the users connected to the server
        io.on('connection', (socket) => {


            // require('./socket-temp.js')(io, socket)

            //socket.emit is not a listener. Instead of listening to an event, we are creating the event
            //first argument is the event that we are creating, then we send any data back to the client along with the new event

            //callback handles the event acknowlegdements
            //Check for real strings in params, if not use callback
            socket.on('join', (params, callback) => {

                //NOTE: Currently params is the object containing both the room name and user name

                // NOTE: Below TODO section is to account for users who already have previously established a chatroom connection
                //TODO: Authenticate current user just as a user who exists, otherwise send an error
                //TODO: We need another middleware auth to check if user has this chatroom by name and chatroom id in their Chatroom array
                //If they do, then grant access to the room



                //NOTE: The below TODO section is the set up upon click the "Make A Bid" button, not the reoccurring auth for entering the room as already established requesters and providers

                //TODO: Authenticate current user just as a user who exists, otherwise send an error,

                //TODO: When user clicks button, grab username of current user and user who owns the card
                //TODO: When user clicks button, it generates a channel name: (String), I dont think we need a unique
                //         socket Id because we can just use the chatroom id when we create it later.
                //TODO: Make POST req to create a Chatroom, (id,requster, provider, messages: [Message] (default empty), channel, productReqCard: productReqCardID)
                //TODO: Update the User Model of both the req and prov (add newly created chatroom to chatroom array)


                //TODO: Middleware: Pass in a user object and if user is not either the requester or as a bidder, send back to index page
                // If they are either, then grant access to the chatroom


                socket.join(params.room);

                users.addUser(socket.id, params.name, params.room);

                //socket.leave(params.room)

                // io.emit emits to every connected users --> io.to(params.room).emit: Sends event to everyone connected in a room
                // socket.broadcast.emit emits to everyone on server except current user --> socket.broadcast.to(params.room).emit: send event to everyone in room except current user
                // socket.emit emits an event to specifically one user

                //Welcome from admin
                socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
                socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

                //Always calling the callback, just no arguments because we dont want to pass any errors back
                callback()

            });

            //listener
            socket.on('createMessage', (message, callback) => {
                // TODO: Grab chatroom by socket id and channel name in a user's channels array
                var user = users.getUser(socket.id);

                if (user && isRealString(message.text)) { //String validation is important to keep to not allow empty strings to fill the chat
                    // socket.emit emits to a single connection, io.emit emits to all connections
                    //TODO: Need to add "from" attribute to message model
                    //By changing from io.emit --> io.to(user.room).emit
                    //TODO: Need to emit to the chatroom that matches the socket.id and channel name in user's array
                    io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))

                }
                //Send an event back to the frontend
                callback();

                // To broadcast, we need to specify the individual socket. This lets the socket.io library know which users shouldn't get the event
                // Will socket.broadcast.emit send event to everyone except this socket
                // createdAt: new Date().getTime()//may want to use this to sort messages in a chatroom

            })

            socket.on('updateUserList', function(users) {
                // console.log("Users list: " users);
            });

            socket.on('createLocationMessage', (coords) => {

                var user = users.getUser(socket.id);

                if (user && isRealString(message.text)) {
                    io.emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
                }
            })

            socket.on('disconnect', () => {
                console.log('User has been disconnected from the server');

            })
        })




    })

}
