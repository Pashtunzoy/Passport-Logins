var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/userModel.js');

module.exports = function() {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      if (req.user) {
          var query = {};
          if (req.user.local) {
              var query = {
                'local.email': req.user.local.email
              };
          } else if(req.user.facebook) {
              var query = {
                'facebook.id': req.user.facebook.id
              };
          } else if (req.user.twitter) {
                var query = {
                  'twitter.id': req.user.twitter.id
                };
          } else if (req.user.github) {
              var query = {
                'github.id': req.user.github.id
              };
          }
          User.findOne(query, function (error, user) {
              console.log(error);
              if (user) {
                user.google = {};
                user.google.id = profile.id;
                user.google.email = profile.emails[0].value;
                user.google.name = profile.name.givenName+ ' ' + profile.name.familyName;
                user.google.token = accessToken;
                user.save();
                done(null, user);
              }
          });
      } else {
        var query = {
          'google.id': profile.id
        };

        User.findOne(query, function(err, user) {
          if (user) {
            done(null, user);
          } else {
            var user = new User();
            user.google = {};
            user.google.id = profile.id;
            user.google.email = profile.emails[0].value;
            user.google.name = profile.name.givenName+ ' ' + profile.name.familyName;
            user.google.token = accessToken;
            user.save();
            done(null, user);
          }
        });
      }
    });
  }));
};
