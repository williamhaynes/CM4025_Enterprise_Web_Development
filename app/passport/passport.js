/**
 * Passport.js is a package which supports OAuth using Facebook
 * This means that you can login to your account using your Facebook credentials
 * Deprecated
/*var FacebookStrategy = require('passport-facebook').Strategy;
var User             = require('../models/user');

module.exports = function(app, passport){

    passport.use(new FacebookStrategy({
            clientID: '12344567890987654',                                         //Facebook App Id - currently random values - not setup correctly
            clientSecret: 'e3yr8g7yhji39ryrhje',                                   //Facebook App Secret - currently random values - not setup correctly
            callbackURL: "http://www.example.com/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function(accessToken, refreshToken, profile, done) {
            //User.findOrCreate(..., function(err, user) {
            //    if (err) { return done(err); }
                done(null, profile);
            }
    ));


    return passport;
}*/