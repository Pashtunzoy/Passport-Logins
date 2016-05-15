var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/userModel.js');

module.exports = function() {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    passReqToCallback: true,
    profileFields: ['emails', 'name']
  },
  function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      if (req.user) {
          var query = {};
          if (req.user.google) {
              var query = {
                  'google.id': req.user.google.id
              };
          } else if (req.user.twitter) {
              var query = {
                  'twitter.id': req.user.twitter.id
              };
          } else if (req.user.github) {
              var query = {
                  'github.id': req.user.github.id
              };
          } else if (req.user.local) {
              var query = {
                  'local.email': req.user.local.email
              };
          }
          User.findOne(query, function (error, user) {
              console.log(error);
              if (user) {
                user.facebook = {};
                user.facebook.name = profile.name.givenName+ ' ' + profile.name.familyName;
                user.facebook.email = profile.emails[0].value;
                user.facebook.id = profile.id;
                user.facebook.token = accessToken;
                user.save();
                done(null, user);
              }
          });
      } else {
        var query = {
          'facebook.id': profile.id
        };
        User.findOne(query, function(err, user) {
          if (user) {
            done(null, user);
          } else {
            var user = new User();
            user.facebook = {};
            user.facebook.name = profile.name.givenName+ ' ' + profile.name.familyName;
            user.facebook.email = profile.emails[0].value;
            user.facebook.id = profile.id;
            user.facebook.token = accessToken;
            user.save();
            done(null, user);
          }
        });
      }
    });
  }));
};
