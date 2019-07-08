const express = require('express');
const authRouts = require('./routes/auth-routes');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('trust proxy', 1);
app.use(session({
    maxAge: 24 * 60 * 60 * 1000,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(authRouts);



app.get('/', function(req, res) {
    console.log(req.session);
    res.render('index');
});

   
app.listen(3000);