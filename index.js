const express = require('express');
const currencyRequest = require('./requests/currency.request');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/register', function(req, res) {
    res.render('register');
});

app.get('/currency', async function (req, res) {
    var data = currencyRequest();
    //console.log(data);
    res.render('index');
});
   
  app.listen(3000);