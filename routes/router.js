const   express = require('express'),
        router = express.Router(),
        passport = require('passport'),
        isAuth = require('../app/authentication/middleware'),
        process = require('../helpers/process');

//index page render
router.get('/', (req, res) => {
    res.render('index', {auth: req.isAuthenticated(), message: req.flash('error')});
});
// login page render
router.get('/user/login', (req,res) => {
    res.render('login', {message: req.flash('error'), auth: req.isAuthenticated()});
});
//auth user
router.post('/login', passport.authenticate('local-login', {failureRedirect : '/user/login', failureFlash: true}), (req,res) => {
    req.flash('error', 'Пользователь авторизирован');
    res.redirect('/');
});
// registration page render
router.get('/user/register', (req, res) => {
    res.render('register', {message: req.flash('error'), auth: req.isAuthenticated()});
});
// save data from registration page
router.post('/register/new', passport.authenticate('local-signup', {failureRedirect : '/user/register', failureFlash: true}), (req, res) => {
    req.flash('error', 'Пользователь зарегистрирован');
    res.redirect('/');
});
// get currency 
router.get('/currency', isAuth, (req, res) => {
    process.transactions().then((date) => {
        res.render('currency', {response: date.response, request: date.request, auth: req.isAuthenticated()});
    }).catch((err) => {
        res.render('login', {message: err});
    });
});
// logout user
router.get('/user/logout', (req,res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;