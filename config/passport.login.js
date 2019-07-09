const   passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        User = require('../models/users');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local-login', new LocalStrategy(
    {
        usernameField: 'register_name',
        passwordField: 'register_password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { 
                return done(err); 
            }
            if (!user) {
                return done(null, false, { message: 'Пользователь не найден' });
            }
            user.comparePassword(password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            });
        });
    }
));
