//Client Side JS

var socket = io();


socket.on('connect', function (){
    var params = jQuery.deparam(window.location.search);
    //Parsing query string to grab name and room name to create the socket room


    //custom event join
    //want to know when and who joined

    //This is the client side entry to the socket room when the form from index is submitted
    //TODO: This is where we should authenticate the user who clicked
    socket.emit('join', params, function (err) {

        // send user back to root
        if (err) {
            alert(err)
            window.location.href = '/'; // if error, go back to index page
        }
        else{
            console.log('No error');
        }
    });



})

//fires when connection drops
socket.on('disconnect', function(){
    console.log('Client: Disconnected from server!');
})


socket.on('updateUserList', function (users) { //users = userArray
    console.log('Users List: ', users);

})

//custom event handler
//The data that was emitted from the server along with the event is provided as the first argument to your callback function
socket.on('newMessage', function (message) {
    //Will return the html markup inside of message-template
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();

    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html)

    // //rather than selecting an element, we are going to create and element and then modify that element and add it into the markup, making it visable
    // var li = jQuery('<li></li>')
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    //
    // //To render on the DOM
    // jQuery('#messages').append(li)
});


    socket.on('newLocationMessage', function (message) {

        var formattedTime = moment(message.createdAt).format('h:mm a')
        var template = jQuery('#location-message-template').html()

        var html = Mustache.render(template, {
            url: message.url,
            from: message.from,
            createdAt: formattedTime
        })

        // var li = jQuery('<li></li>')
        // var a = jQuery('<a target="_blank">My current locaiton</a>');

        // li.text(`${message.from} ${formattedTime}: `);
        // // Set and fetch attributes inside jquery selected elements
        //
        // //Helps prevent html injection attacks
        // a.attr('href', message.url)
        // li.append(a);

        jQuery('#messages').append(html)

    });




jQuery('#message-form').on('submit', function(e) {
    // prevents defult behavior for the event, the default event for sumbit is the refresh page event
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        // going to select any name attribute equal to message
        text: messageTextBox.val()
        //Need to include a callback for the event acknowlegdement
    }, function () {

        //By passing in a value to .val we are setting a value instead of getting a value, in this case an empty string
        messageTextBox.val('')
    });
});


    var locationButton = jQuery('#send-location');
    // Same as jQuery('#send-location').on()
    locationButton.on('click', function () {
        if (!navigator.geolocation){
            return alert('Geoloation not supported by your browser') //Should replace with bootstrap alert
        }
        //disabled send location
        locationButton.attr('disabled', 'disabled').text("Sending Location...");

        //Gets coords based off of broswer
        //Takes two functions: 1st a success function and second an error hanlder
        navigator.geolocation.getCurrentPosition(function (position) {
            locationButton.removeAttr('disabled').text('Send Location');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        }, function () {
            locationButton.removeAttr('disabled').text('Send Location');
            alert('Unable to fetch location')
        })
    })
