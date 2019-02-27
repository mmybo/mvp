const express = require('express');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 5000;


const app = express();
var server = require('http').Server(app);


require('dotenv').config();
require('./data/database');

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.use(require('cookie-parser')());
app.use(require('method-override')('_method'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Socket.io
const io = require('socket.io')(server);

//store our online users here (locally)
// Each socket has a unique ID that identifies it as a unique connected user. So we can make this ID do double duty to identify our users.
let onlineUsers = {};

// We want General channel to be available without having to be created.
// The array value that comes with the channel key will be used to save each channel's messages.
let channels = { "General": [] }

// io.on("connection") is a special listener that fires whenever a new client connects.
io.on('connection', (socket) => {
    // This file will be read on new socket connections
    // Make sure to send the users to our chat file
    require('./sockets/chat.js')(io, socket, onlineUsers, channels);
})


// Checks authenticated state of user on every request
app.use(require('./middleware/check-auth'));

// Controllers
require('./controllers/users')(app);
require('./controllers/products')(app);

// app.get('/', (req, res) => {
//     const products = require('./data/mockData').products;
//     res.render('index', { products });
// });

//Start page for chat
app.get('/chat', (req, res) => {
    res.render('chatroom');
})

server.listen(PORT, console.log('Running MMYBO on ' + PORT));






// server.listen('3000', () => {
//     console.log('Server listening on Port 3000');
// })
