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

            // res.redirect('/');
            res.redirect('/manage-offers');
        });

    });




    var server = http.createServer(app)
    var io = socketIO(server) //This is our websocket server, how we communicate between server and client

    app.get('/manage-offers', requireLogin, (req, res) => {

        var userChatrooms = []; // Array of all chatrooms that user is associated with
        var channels = req.user.chatrooms // Not renaming channels to userChatrooms for easy back changes

        for(chatroomId of req.user.chatrooms){
          Chatroom.findById(chatroomId).then(chatroom => {
            userChatrooms.unshift(chatroom)
        }).catch(err => {
            console.log("Looping over current user chatroom error:", err);
            })
        }


        console.log(userChatrooms);
        //NOTE: Its ok to render the page first before establishing socket connection because it is the CLIENT that must first make the request to upgrade to a socket connection from HTTP
        res.render('temp-chatroom.hbs', {userChatrooms})


        //lets you register an event listener
        // built in event listener like connection lets you listen when a client connects to the server
        // 'socket' which is passed into the callback represents the individual socket as opposed to all the users connected to the server
        io.on('connection', (socket) => {

            //listen on "new user" socket emits
            // Now whenever the client emits a "new user" request, our server will be on it.
            socket.on('new user', (username) => {
                // Send the username to all clients currently connected
                onlineUsers[username] = socket.id;
                //Save the username to socket as well. This is important for later.
                socket["username"] = username;
                console.log(`${username} has joined the chat!`);
                io.emit("new user", username);

                // io.emit sends data to all clients on the connection.
                // socket.emit sends data to the client that sent the original data to the server.
            })

            //Listen for new messages
            socket.on('new message', async (data) => {
              //Save the new message to the channel.

              const current_chatroom = await Chatroom.findById(data.channel);

              //TODO: Chatrooms need message attribute of type array in order for us to load messages & persist chat room messages

              //NOTE: May not need to go through req.user if I already found the chatroom. Just add messages to chatroom messages arrary with the correct attributions to sender, content, etc
              //TODO: Create and push message object to chatroom array of messages

              const new_message = new Message({sender: data.sender, message: data.message})

              current_chatroom.push(new_message);
              //channels[data.channel].push({sender : data.sender, message : data.message});


              //TODO: Instead of "data", should I be emitting new_message?
              //Emit only to sockets that are in that channel room.
              io.to(data.channel).emit('new message', data);
            });

            socket.on('get online users', () => {
              //Send over the onlineUsers
              socket.emit('get online users', onlineUsers);
            })

            // socket.on("disconnect") is a special listener that fires when a user exits out of the application.
            //This fires when a user closes out of the application
            socket.on('disconnect', () => {
              //This deletes the user by using the username we saved to the socket
              delete onlineUsers[socket.username]
              io.emit('user has left', onlineUsers);
            });




            socket.on('new channel', (newChannel)=> {
                //Save the new channel to our channel's object. The array will hold the messages.
                channels[newChannel] = [];
                //Have the socket join the new channel room
                socket.join(newChannel);
                // Infrom all clients of new channel

                // TODO: Should emit to everyone in socket room, not all socket connections, if needed
                io.emit('new channel', newChannel);
                // Emit to the client that made the new channel, to change their channel to the only one they made.
                socket.emit('user change channel', {
                    channel: newChannel,
                    messages: channels[newChannel]
                });

            })

            //The client must send back the chatroom._id
            socket.on('user changed channel', (newChannel) => {

              socket.join(newChannel);


              socket.emit('user changed channel', {
                channel : newChannel
                // messages : channels[newChannel]
              });
            })


    })

})

}
