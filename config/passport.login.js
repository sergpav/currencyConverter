const   passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        User = require('../models/users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use('local-login', new LocalStrategy(
    {
        usernameField: 'register_name',
        passwordField: 'register_password',
        passReqToCallback : true
    },
    (req, username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
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
                    return done(null, false, { message: 'Неверный пароль' });
                }
            });
        });
    }
));
