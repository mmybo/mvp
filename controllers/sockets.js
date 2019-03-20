const socketIO = require('socket.io');

module.exports = function(server){
    var io = socketIO(server) //This is our websocket server, how we communicate between server and client

    //lets you register an event listener
    // built in event listener like connection lets you listen when a client connects to the server
    // 'socket' which is passed into the callback represents the individual socket as opposed to all the users connected to the server
    io.on('connection', (socket) => {

        console.log("Connection Established");

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
        socket.on('new message', (data) => {
          //Save the new message to the channel.

          // Data: { sender: 'User 1',
          // message: 'asdsss'}
          console.log("Data:", data);
          currentChatroom = Chatroom.findById(data.channel).then((chatroom) => {
              message = new 
          })
          // TODO: Find Chatroom using data.channel, which is the chatroom id.
          // populate the messages attribute with a newly created Message Object
          channels[data.channel].push({sender : data.sender, message : data.message}); //NOTE: In localized version: channels = [<channel-name> : [Array of message objects]]
          //Emit only to sockets that are in that channel room.
          // NOTE: Even though this was for the localized version, I think the logic is the same.
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
          // delete onlineUsers[socket.username]
          // io.emit('user has left', onlineUsers);
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
                messages: ['Test message1', 'Second message']
            });

        })

        //The client must send back the chatroom._id
        socket.on('user changed channel', (newChannel) => {

          // TODO: I DONT want to join a socket room using the channel string, I want unique channel id
          socket.join(newChannel);

          // console.log("SERVER SIDE: user changed channel");

          socket.emit('user changed channel', {
            channel : newChannel,
            messages : ['Test message1', 'Second message']
          });
        })

    })
}
