var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var User = require('../../models/userModel.js');

module.exports = function() {
  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      if (req.user) {
        var query = {};
        if(req.user.google) {
            var query = {
                'google.id': req.user.google.id
            };
        } else if(req.user.facebook) {
            var query = {
                'facebook.id': req.user.facebook.id
            };
        } else if (req.user.twitter) {
            var query = {
                'twitter.id': req.user.twitter.id
            };
        } else if (req.user.local) {
            var query = {
              'local.email': req.user.local.email
            };
        }
        User.findOne(query, function (error, user) {
            console.log(error);
            if(user) {
              user.github = {};
              user.github.name = profile._json.name;
              user.github.id = profile.id;
              user.github.token = accessToken;
              user.save();
              done(null, user);
            }
        });
      } else {
        var query = {
          'github.id': profile.id
        };
        User.findOne(query, function(err, user) {
          if(user) {
            done(null, user);
          } else {
            var user = new User();
            user.github = {};
            user.github.name = profile._json.name;
            user.github.id = profile.id;
            user.github.token = accessToken;
            user.save();
            done(null, user);
          }
        });
      }
    });
  }));
};
