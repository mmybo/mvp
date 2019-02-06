module.exports = (io, socket, onlineUsers, channels) => {

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
      channels[data.channel].push({sender : data.sender, message : data.message});
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

    socket.on('new channel', (newChannel) => {
      console.log('New Channel Created:', newChannel);
    })

    socket.on('new channel', (newChannel)=> {
        //Save the new channel to our channel's object. The array will hold the messages.
        channels[newChannel] = [];
        //Have the socket join the new channel room
        socket.join(newChannel);
        // Infrom all clients of new channel
        io.emit('new channel', newChannel);
        // Emit to the client that made the new channel, to change their channel to the only one they made.
        socket.emit('user change channel', {
            channel: newChannel,
            messages: channels[newChannel]
        });

    })

    //Have the socket join the room of the channel
    socket.on('user changed channel', (newChannel) => {
      socket.join(newChannel);
      socket.emit('user changed channel', {
        channel : newChannel,
        messages : channels[newChannel]
      });
    })




}
