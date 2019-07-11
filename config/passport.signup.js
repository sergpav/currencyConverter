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


passport.use('local-signup', new LocalStrategy(
    {
        usernameField: 'register_name',
        passwordField: 'register_password',
        passReqToCallback: true
    },
    (req ,username, password, done) => {
        User.findOne({$or: [
            {'username': username},
            {'email': req.body.register_email}
        ]}, (err, user) => {
            if (err) { 
                return done(err); 
            }
            if (user) {
                if (user.email == req.body.register_email && user.username == username)
                {
                    return done(null, false, {'message': 'Имя пользователя и email уже зарегистрированы'});
                }
                if (user.email == req.body.register_email) {
                    return done(null, false, {'message': 'email уже зарегистрирован'});
                }
                if (user.username == username) {
                    return done(null, false, {'message': 'Имя пользователя уже зарегистрировано'});
                }
            }
            else {
                let person = new User();
                person.username = username;
                person.email = req.body.register_email;
                person.password = password;
                person.save( (err) => {
                    if (err) {
                        throw err;
                    }
                    return done(null, person);
                });
            }
        });
    }
));