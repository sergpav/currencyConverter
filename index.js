const express = require('express');
const bodyParser = require('body-parser');
const currencyRequest = require('./requests/currency.request');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/register', function(req, res) {
    res.render('register');
});

app.post('/register/new', function(req, res) {
    let {register_name, register_email, register_password,register_password_confirm } = req.body;
    console.log(register_name);
});

app.post('/login', function(req,res) {
    let {register_name, register_password } = req.body;
    console.log(register_name);
})

app.get('/currency', async function (req, res) {
    var data = currencyRequest();
    //console.log(data);
    res.render('index');
});
   
  app.listen(3000);