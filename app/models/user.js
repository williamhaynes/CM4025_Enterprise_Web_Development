/**
 * Serverside user related controls
 */

var mongoose = require('mongoose');                 //import mongoose, allow MongoDB connectivity
var Schema = mongoose.Schema;                       //Schema - allows you to create set JSON format documents to be used with MongoDB //More detail on schemas - mongoosejs.com/docs/validation.html
var bcrypt = require('bcrypt-nodejs');              //Encryption module

//Unique is not a validator - it is simply a serverside assist for MongoDB, so don't try and use it for validation
/**
 * Schema for Users
 */
var UserSchema = new Schema ({
    username: { type: String, lowercase: true, required: true, index: {unique: true} },
    password: { type: String, required: true },
    email:  { type: String, required: true, lowercase: true },
    guildname: {type: String, lowercase:true},
    gold: {type: Number}
});

/**
 * Encryption for passwords
 * This function acts before the password is saved - hashing it, so it's not stored in plaintext
 */

UserSchema.pre('save', function(next){
    //whatever user is running through middleware
    var user = this;
    bcrypt.hash(user.password, null, null, function(err, hash){
        if(err) return next(err);
        user.password = hash;
        next();
    });
});

/**
 * Password Authentication
 * This function utilises bcrypt to compare a password passed in by a user to the MongoDB server hashed password
 */

UserSchema.methods.comparePassword = function(password){
    //Use bcrypt to compare the password passed in by the user to the hashed password in DB
    return bcrypt.compareSync(password, this.password);
}

/**
 * Exports for Schemas - Allow Server to use this Schema - export to server file
 * Format mongoose.model('modelName', callVariableName);
 */

module.exports = mongoose.model('User', UserSchema);