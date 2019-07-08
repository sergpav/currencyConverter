const router = require('express').Router();
const validator = require('validator');
let User = require('../models/users');
const mongoose = require('mongoose');
const currencyRequest = require('../requests/currency.request');
const request = require('request');

mongoose.connect("mongodb://127.0.0.1:27017/converter",{ useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

//auth login
router.get('/login', function(req,res) {
    res.render('login', {message:null});
})
//auth register
router.get('/register', function(req, res) {
    res.render('register');
});
//auth logout
router.get('/logout', function(req,res) {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});
//auth user and pass
router.post('/login', function(req,res) {
    let {register_name, register_password} = req.body;
    User.findOne({'username' : register_name, 'password' : register_password}, function(err, person) {
        if(!person) {
            res.render('login', {message: 'Неправильное имя пользователя или пароль'});
        } else {
            let sess = req.session;
            sess.user_id = person._id;
            res.redirect('/currency');
        }
    });
});

//save user
router.post('/register/new', function(req, res) {
    let {register_name, register_email, register_password,register_password_confirm } = req.body;
    if(register_name.trim().length >=6 && validator.isEmail(register_email) && register_password.trim().length >= 6 && register_password_confirm.trim() >= 6 && register_password == register_password_confirm) {
        let user = new User({
            username: register_name,
            email: register_email,
            password: register_password,
            createdAt: new Date()
        });
        user.save((function(err, person) {
            if(err) {
                if(err.errors.username && err.errors.email) {
                    return res.status(422).send({ succes: false, message: 'Username and email already exist!' });
                } else if(err.errors.username) {
                    return res.status(422).send({ succes: false, message: 'Username already exist!' });
                } else if(err.errors.email) {
                    return res.status(422).send({ succes: false, message: 'Email already exist!' });
                }
            }
            else {
                let sess=req.session;
                sess.user_id = person._id;
                console.log(sess);
                res.redirect('/currency');
            }
        }));
    } else {
        res.redirect('/register');
    }
});


router.get('/currency', async function (req, res) {
    if(req.session.user_id) {
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
    }
    res.render('login', {message:'Авторизируйтесь для доступа к данной странице'});
});

module.exports = router;