const express = require('express');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 5000;

const app = express();

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

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, console.log('Running MMYBO on ' + PORT));
