const   express = require('express'),
        router = express.Router(),
        passport = require('passport'),
        isAuth = require('../app/authentication/middleware'),
        process = require('../helpers/process');

//index page render
router.get('/', (req, res) => {
    res.render('index', {auth: req.isAuthenticated()});
});
// login page render
router.get('/login', function(req,res) {
    res.render('login', {message: req.flash('error'), auth: req.isAuthenticated()});
});
//auth user
router.post('/login', passport.authenticate('local-login', {failureRedirect : '/login', failureFlash: true}), function(req,res) {
    res.redirect('/currecy');
});

router.get('/register', function(req, res) {
    res.render('register', {message: req.flash('error'), auth: req.isAuthenticated()});
});

router.post('/register/new', passport.authenticate('local-signup', {failureRedirect : '/register', failureFlash: true}), function(req, res) {
    res.redirect('/currency');
});

router.get('/currency', isAuth, function (req, res) {
    process.transactions().then((data) => {
        res.render('currency', {data: data});
    }).catch((err) => {
        res.render('login', {message: err});
    });
});

router.get('/logout', function(req,res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;