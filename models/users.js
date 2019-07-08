const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        validate: {
            validator: validator.isEmail
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
// userSchema.plugin(uniqueValidator);
// userSchema.methods.validPassword = function (pwd) {
//     return (this.password === pwd);
// };
userSchema.pre('save', function(next) {
    var user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return next (err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return createImageBitmap(err);
        cb(null, isMatch);
    });
}

module.exports = mongoose.model('User', userSchema);