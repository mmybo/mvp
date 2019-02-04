const express = require('express');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 5000;

const app = express();

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.use(require('cookie-parser')());
app.use(express.static('public'));

// This will check for an authenticated user before every request
app.use(require('./middleware/auth'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, console.log('Running MMYBO on ' + PORT));

