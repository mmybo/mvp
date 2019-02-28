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
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Checks authenticated state of user on every request
app.use(require('./middleware/auth'));

// Controllers
require('./controllers/users')(app);
require('./controllers/products')(app);
require('./controllers/chats')(app);



// app.get('/chat', (req, res) => {
//
//     res.render('chat-index');
//
// })




server.listen(PORT, console.log('Running MMYBO on ' + PORT));


// server.listen('3000', () => {
//     console.log('Server listening on Port 3000');
// })
