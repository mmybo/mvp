

// const express = require('express')
const exphbs = require('express-handlebars');
const socketIO = require('socket.io');
const http = require('http');
//we need to use http ourselves and configure it with express
const {generateMessage, generateLocationMessage} = require('../services/message');
const {isRealString} = require('../services/string-validation')

// const {Users} = require('./utils/users')

// const publicPath = path.join(__dirname, '../public/');
// app.use(express.static(publicPath))


// var app = express();
module.exports = function (app) {


    app.get('/chatroom', (req, res) => {
        res.render('chatroom.hbs')
    })


    app.post('/chats', (req, res) => {

        // TODO: Need to add name attributes in the index page for attributes that I'm using to create the chatroom

        if (req.user){
            const chatroom = new Chatroom(req.body);

            chatroom.channel = req.cardTitle + " Channel"
            chatroom.requester = req.requesterId
            chatroom.provider = req.user._id
            chatroom.productReqCard = req.requestId


            //TODO: Save chatroom, add chatroom to BOTH users chatroom arrays, catch errors, redirect to appropriate page
            chatroom.save().then(chatroom => {
                requester = User.findById(chatroom.requester)
                requester.chatrooms.unshift(chatroom)
                provider = User.findById(chatroom.provider)
                provider.chatrooms.unshift(chatroom)

                requester.save();
                provider.save();

                res.redirect('/manage-offers')

            }).catch(err => {
                console.log(err.message);
            });


        }else{
            return res.status(404).send({message: "Something went wrong, your account may not have been found or our server was unable to create the chatroom"})
        }

    });




    var server = http.createServer(app)
    var io = socketIO(server) //This is our websocket server, how we communicate between server and client

    app.get('/manage-offers', (req, res) => {

        //Find all the chatrooms of the user who hits the route
        userChatrooms = User.findById(req.user._id).then(user => {
            console.log("Users chatroom", chatrooms);
            return user.chatrooms
        }).catch(err => {
            console.log('Error', err);
        })


        res.render('chatroom.hbs', {userChatrooms})

        // TODO: Need to render the manage offers page, with userChatrooms injecting each chatroom into a div into sidebar
        // TODO: When Channel is clicked, it should join the socket room using the chatroom._id (STRETCH CHALLENGE)it should reload the chat with chatroom.messages array based off the timestamped messages



        //TODO: MUST PUT SOCKET LOGIC INSIDE CONTROLLER

        




        console.log("AM I BEING RENDERED");

        //lets you register an event listener
        // built in event listener like connection lets you listen when a client connects to the server
        // 'socket' which is passed into the callback represents the individual socket as opposed to all the users connected to the server
        io.on('connection', (socket) => {
            console.log('Server: new user connected');


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

                if(user && isRealString(message.text)){ //String validation is important to keep to not allow empty strings to fill the chat
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

            socket.on('createLocationMessage', (coords) => {

                var user = users.getUser(socket.id);

                if (user && isRealString(message.text)){
                    io.emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
                }
            })

            socket.on('disconnect', () => {
                console.log('User has been disconnected from the server');

            })
        })




    })

}
