var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/userModel.js');

module.exports = function() {
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL,
    passReqToCallback: true
  },
  function(req, token, tokenSecret, profile, done) {
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
            if(user) {
              user.twitter = {};
              user.twitter.id = profile.id;
              user.twitter.name = profile.displayName;
              user.twitter.username = profile.username;
              user.twitter.token = token;
              user.twitter.tokenSecret = tokenSecret;
              user.save();
              done(null, user);
            }
        });
    } else {
      var query = {
        'twitter.id': profile.id
      };
      User.findOne(query, function(err, user) {
        if (user) {
          done(null, user);
        } else {
          var user = new User();
          user.twitter = {};
          user.twitter.id = profile.id;
          user.twitter.name = profile.displayName;
          user.twitter.username = profile.username;
          user.twitter.token = token;
          user.twitter.tokenSecret = tokenSecret;
          user.save();
          done(null, user);
        }
      });
    }
    });
  }
));
};
