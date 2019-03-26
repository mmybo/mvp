const express = require('express');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 5000;
const multer = require('multer');


const app = express();
var server = require('http').Server(app);
require('./controllers/sockets')(server)


require('dotenv').config();
require('./data/database');
const storage = require('./data/database').storage;
// var gfs = require('./data/database').gfs;

const upload = multer({storage});




// Middleware
app.engine('hbs', exphbs({
    defaultLayout: 'main', extname: 'hbs', helpers: require('./handbars-helpers')
}));
app.set('view engine', 'hbs');
app.use(require('cookie-parser')());
app.use(require('method-override')('_method'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./middleware/check-auth'));





// Controllers
require('./controllers/users')(app, upload);
require('./controllers/products')(app);
require('./controllers/productsForSale')(app);
require('./controllers/temp-chats')(app, server);


server.listen(PORT, console.log('Running MMYBO on ' + PORT));

module.exports = server;
