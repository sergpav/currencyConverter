const express = require('express');
const bodyParser = require('body-parser');
const currencyRequest = require('./requests/currency.request');
const mongoose = require('mongoose');
const validator = require('validator');
const request = require('request');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
   
const url = "mongodb://localhost:27017/";
//const mongoClient = new MongoClient(url, { useNewUrlParser: true });

//mongoose.connect("mongodb://127.0.0.1:27017/", {useNewUrlParser: true});

// mongoClient.connect(function(err, client){
      
//     const db = client.db("converter");
//     const collection = db.collection("Users");
//     // let user = {name: "Tom", age: 23};
//     // collection.find().toArray((err, items) => {
//     //     console.log(items);
//     // });
//     // collection.insertOne(user, function(err, result){
          
//     //     if(err){ 
//     //         return console.log(err);
//     //     }
//     //     console.log(result.ops);
//     //     client.close();
//     // });
// });

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/register', function(req, res) {
    res.render('register');
});

app.post('/register/new', function(req, res) {
    let {register_name, register_email, register_password,register_password_confirm } = req.body;
    if(register_name.trim().length >=6 && validator.isEmail(register_email) && register_password.trim().length >= 6 && register_password_confirm.trim() >= 6 && register_password == register_password_confirm) {
        console.log('hi');
    } else {
        console.log('no');
    }
});

app.post('/login', function(req,res) {
    let {register_name, register_password } = req.body;
    console.log(register_name);
})

app.get('/currency', async function (req, res) {
    var data = await currencyRequest();

    var options = {
        uri: 'https://7np770qqk5.execute-api.eu-west-1.amazonaws.com/prod/process-transactions',
        method: 'POST',
        json: data
    };
    request(options, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            console.log(body);
        }

    });
    res.render('index');
});
   
app.listen(3000);