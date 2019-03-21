const socketIO = require('socket.io');
const Chatroom = require('../models/chatroom');
const Message = require('../models/message');
const User = require('../models/user');

module.exports = function(server){
    var io = socketIO(server) //This is our websocket server, how we communicate between server and client

    //lets you register an event listener
    // built in event listener like connection lets you listen when a client connects to the server
    // 'socket' which is passed into the callback represents the individual socket as opposed to all the users connected to the server
    io.on('connection', (socket) => {

        console.log("Connection Established");

        //Listen for new messages
        socket.on('new message', async(data) => {
          //Save the new message in the chatroom.

          console.log("Data:", data);

          let username;

          await User.findById(data.sender).then((user) => {
            username = user.name;
        })

          await Chatroom.findById(data.channel).then((chatroom) => {
            newMessage = new Message({sender: username, content: data.message});
            newMessage.save().then((message) => {
                chatroom.messages.push(message);
                chatroom.save();



                console.log("Message Sent:", message);

                io.to(data.channel).emit('new message', message);
            })
        })

          // channels[data.channel].push({sender : data.sender, message : data.message}); //NOTE: In localized version: channels = [<channel-name> : [Array of message objects]]
          //Emit only to sockets that are in that channel room.

        });

        socket.on('get online users', () => {
          //Send over the onlineUsers
          socket.emit('get online users', onlineUsers);
      });

        // socket.on("disconnect") is a special listener that fires when a user exits out of the application.
        //This fires when a user closes out of the application
        socket.on('disconnect', () => {
          //This deletes the user by using the username we saved to the socket
          // delete onlineUsers[socket.username]
          // io.emit('user has left', onlineUsers);
        });



        //The client must send back the chatroom._id
        socket.on('user changed channel', async(newChannel) => {

          let messageIds;

          // TODO: I DONT want to join a socket room using the channel string, I want unique channel id
          socket.join(newChannel);

          // console.log("SERVER SIDE: user changed channel");


          socket.emit('user changed channel', {
            channel : newChannel,
            // messages : ['Test message1', 'Second message']
          });

          Chatroom.findById(newChannel).then((chatroom) => {
              messageIds = chatroom.messages
          });

          for (i=0; i < messageIds.length; i++){

              Message.findById(messageIds[i]).then((message) => {
                socket.emit('new message', message)
              })
          }

        })

    })
}
