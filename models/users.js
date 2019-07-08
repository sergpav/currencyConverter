const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
userSchema.plugin(uniqueValidator);
userSchema.methods.validPassword = function (pwd) {
    return (this.password === pwd);
};


module.exports = mongoose.model('User', userSchema);