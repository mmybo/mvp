const express = require('express');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 5000;

const app = express();

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, console.log('Running MMYBO on ' + PORT));

