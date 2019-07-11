const   mongoose = require('mongoose'),
        validator = require('validator'),
        bcrypt = require('bcrypt'),
        saltRounds = 10;

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
userSchema.pre('save', function(next) {
    let user = this;
    if(!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return next (err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if(err) return createImageBitmap(err);
        cb(null, isMatch);
    });
}

module.exports = mongoose.model('User', userSchema);