const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    Usuario:{type: String},
    Email:{type: String},
    Password:{type: String},
    isAdmin:{type: Boolean, default:false},
})


UserSchema.pre('save', function(next) {
    const user = this;

    bcrypt.hash(user.Password, 10, (error, hash) => {
        user.Password = hash
        next()
    });
});

module.exports = mongoose.model('User', UserSchema);

// const User = mongoose.model("User", UserSchema );

// module.exports = User;